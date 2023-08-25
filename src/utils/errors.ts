/* eslint-disable @typescript-eslint/no-explicit-any */
export const getServerError = (error?: any) => {
  const message = error?.message;
  if (!message) {
    return;
  }
  try {
    const errors = JSON.parse(message);
    return Object.fromEntries(
      errors.map((entry: any) => [entry.path.join("."), entry]),
    );
  } catch {
    return;
  }
};
