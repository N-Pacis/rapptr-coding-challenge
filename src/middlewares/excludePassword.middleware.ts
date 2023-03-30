
export async function excludePassword(params: any, next: any) {
  const result = await next(params);
  if (params?.model === "User" && params?.args?.select?.password !== true) {
    delete result.password;
  }
  return result;
}
