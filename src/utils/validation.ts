import { safeParse, type BaseSchema, type ParseInfo } from "valibot";

export const safeParseOrNull = <TSchema extends BaseSchema>(
  schema: TSchema,
  input: unknown,
  info?: Pick<ParseInfo, "abortEarly" | "abortPipeEarly">,
) => {
  const result = safeParse(schema, input, info);
  return result.success ? result.output : null;
};
