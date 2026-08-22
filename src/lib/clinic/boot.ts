import { getSql } from "./db";
import { ensureStaffSeeds } from "./repo";

declare global {
  var __pwwClinicSeeded: boolean | undefined;
}

export async function bootClinic(): Promise<void> {
  await getSql();
  if (globalThis.__pwwClinicSeeded) return;
  await ensureStaffSeeds();
  globalThis.__pwwClinicSeeded = true;
}
