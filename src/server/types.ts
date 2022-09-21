/* eslint-disable @typescript-eslint/naming-convention */

export type ResourceResult<TData> =
  | {
      kind: "error";
      message: string;
    }
  | {
      kind: "success";
      data: TData;
    };
