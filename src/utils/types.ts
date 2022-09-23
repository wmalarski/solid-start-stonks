export type AppendArgument<Fn, A> = Fn extends (...args: infer R) => infer P
  ? (...args: [...R, A]) => P
  : never;
