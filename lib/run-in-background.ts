import "server-only";

export function runInBackground(promise: Promise<unknown>) {
  void promise.catch((err) => console.error("[bg task failed]", err));
}
