import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { PGlite } from "@electric-sql/pglite";

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

function schemaSql(): string {
  const file = path.join(process.cwd(), "db", "schema.sql");
  return readFileSync(file, "utf8");
}

function hostedUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.NEON_DATABASE_URL ||
    undefined
  );
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
      const rows = (await sql.query(text, params)) as T[];
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
      const client = hostedUrl() ? await createNeon() : await createPglite();
      await client.exec(schemaSql());
      globalThis.__pwwClinicSql = client;
      return client;
    })();
  }
  return globalThis.__pwwClinicReady;
}

export async function resetSqlForTests(): Promise<void> {
  globalThis.__pwwClinicSql = undefined;
  globalThis.__pwwClinicReady = undefined;
}
