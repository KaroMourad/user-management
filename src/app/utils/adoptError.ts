export const adoptError = (err: unknown): Error => {
  if (err instanceof Error) {
    return err;
  }
  if (typeof err === "string") {
    return new Error(err);
  }
  return new Error("Something went wrong!");
}
