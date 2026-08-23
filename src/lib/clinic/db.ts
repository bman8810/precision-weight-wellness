import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { migrateClinic } from "./migrate";

export type QueryResult<T = Record<string, unknown>> = { rows: T[] };

export type SqlClient = {
  query: <T = Record<string, unknown>>(
    text: string,
    params?: unknown[]
  ) => Promise<QueryResult<T>>;
  exec: (text: string) => Promise<void>;
};

declare global {
  var __pwwClinicSql: SqlClient | undefined;
  var __pwwClinicReady: Promise<SqlClient> | undefined;
}

function schemaStatements(): string[] {
  const file = path.join(process.cwd(), "db", "schema.sql");
  return readFileSync(file, "utf8")
    .replace(/--[^\n]*/g, "")
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function hostedUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.NEON_DATABASE_URL ||
    undefined
  );
}

async function applySchema(client: SqlClient): Promise<void> {
  try {
    const { rows } = await client.query<{ n: string }>(
      `select tablename as n from pg_tables where schemaname = 'public' and tablename = 'users'`
    );
    if (rows.length > 0) return;
  } catch {
    // empty database
  }
  for (const part of schemaStatements()) {
    const sql = part.endsWith(";") ? part : `${part};`;
    await client.exec(sql);
  }
}

async function createPglite(): Promise<SqlClient> {
  const dataDir =
    process.env.CLINIC_PG_PATH ||
    (process.env.VERCEL
      ? "/tmp/pww-clinic"
      : path.join(process.cwd(), "data", "pww-clinic"));
  mkdirSync(dataDir, { recursive: true });
  const pg = new PGlite(dataDir);
  await pg.waitReady;
  return {
    async query<T>(text: string, params: unknown[] = []) {
      const res = await pg.query<T>(text, params);
      return { rows: (res.rows ?? []) as T[] };
    },
    async exec(text: string) {
      await pg.exec(text);
    },
  };
}

async function createNeon(): Promise<SqlClient> {
  const { neon } = await import("@neondatabase/serverless");
  const url = hostedUrl();
  if (!url) throw new Error("DATABASE_URL missing");
  const sql = neon(url);
  return {
    async query<T>(text: string, params: unknown[] = []) {
      const raw = await sql.query(text, params);
      const rows = (Array.isArray(raw) ? raw : (raw as { rows?: T[] }).rows ?? []) as T[];
      return { rows };
    },
    async exec(text: string) {
      await sql.query(text, []);
    },
  };
}

export async function getSql(): Promise<SqlClient> {
  if (globalThis.__pwwClinicSql) return globalThis.__pwwClinicSql;
  if (!globalThis.__pwwClinicReady) {
    globalThis.__pwwClinicReady = (async () => {
      try {
        const client = hostedUrl() ? await createNeon() : await createPglite();
        await applySchema(client);
        await migrateClinic(client);
        globalThis.__pwwClinicSql = client;
        return client;
      } catch (err) {
        globalThis.__pwwClinicReady = undefined;
        throw err;
      }
    })();
  }
  return globalThis.__pwwClinicReady;
}

export async function resetSqlForTests(): Promise<void> {
  globalThis.__pwwClinicSql = undefined;
  globalThis.__pwwClinicReady = undefined;
}
