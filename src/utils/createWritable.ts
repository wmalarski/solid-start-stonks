/* eslint-disable solid/reactivity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMemo, createSignal } from "solid-js";

export const createWriteable = <T>(getter: () => T) => {
  const x = createMemo(() => {
    const [signal, setSignal] = createSignal(getter());
    return [signal, setSignal] as const;
  });
  return [() => x()[0](), (newValue: T) => x()[1](newValue as any)];
};
