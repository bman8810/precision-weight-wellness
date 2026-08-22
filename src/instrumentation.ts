export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { bootClinic } = await import("@/lib/clinic/boot");
    await bootClinic();
  }
}
