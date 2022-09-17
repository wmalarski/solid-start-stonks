import { useI18n } from "@solid-primitives/i18n";
import clsx from "clsx";
import { Component, For, Show } from "solid-js";

type Props = {
  disabled: boolean;
  id: string;
  value: Date;
  onChange: (value: Date) => void;
};

export const DatePicker: Component<Props> = (props) => {
  const [, { locale }] = useI18n();

  const months = () => {
    const formatter = Intl.DateTimeFormat(locale(), { month: "long" });
    return new Array(12).fill(0).map((_, index) => ({
      text: formatter.format(new Date(0, index, 1)),
      value: index,
    }));
  };

  const days = () => {
    const month = props.value.getMonth();
    const daysInMonth = new Date(0, month + 1, 0).getDate();
    const formatter = Intl.DateTimeFormat(locale(), { day: "2-digit" });
    return new Array(daysInMonth).fill(0).map((_, index) => ({
      text: formatter.format(new Date(0, month, index + 1)),
      value: index + 1,
    }));
  };

  const years = () => {
    const formatter = new Intl.DateTimeFormat(locale(), { year: "numeric" });
    return new Array(10)
      .fill(2020)
      .map((value, index) => formatter.format(new Date(value + index, 0, 1)));
  };

  return (
    <div id={props.id} class="flex">
      <For each={new Intl.DateTimeFormat(locale()).formatToParts(props.value)}>
        {(part) => (
          <>
            <Show when={part.type === "day"}>
              <select
                class={clsx("select select-bordered select-sm", {
                  "select-disabled": props.disabled,
                })}
                disabled={props.disabled}
                value={props.value.getDate()}
                onChange={(event) => {
                  const next = new Date(props.value);
                  next.setDate(Number(event.currentTarget.value));
                  props.onChange(next);
                }}
              >
                <For each={days()}>
                  {(day) => <option value={day.value}>{day.text}</option>}
                </For>
              </select>
            </Show>
            <Show when={part.type === "literal"}>
              <span>{part.value}</span>
            </Show>
            <Show when={part.type === "month"}>
              <select
                class={clsx("select select-bordered select-sm", {
                  "select-disabled": props.disabled,
                })}
                disabled={props.disabled}
                value={props.value.getMonth()}
                onChange={(event) => {
                  const next = new Date(props.value);
                  const month = Number(event.currentTarget.value);
                  next.setMonth(month);
                  while (next.getMonth() !== month) {
                    next.setDate(next.getDate() - 1);
                  }
                  props.onChange(next);
                }}
              >
                <For each={months()}>
                  {(month) => <option value={month.value}>{month.text}</option>}
                </For>
              </select>
            </Show>
            <Show when={part.type === "year"}>
              <select
                class={clsx("select select-bordered select-sm", {
                  "select-disabled": props.disabled,
                })}
                disabled={props.disabled}
                value={part.value}
                onChange={(event) => {
                  const next = new Date(props.value);
                  next.setFullYear(Number(event.currentTarget.value));
                  props.onChange(next);
                }}
              >
                <For each={years()}>
                  {(year) => <option value={year}>{year}</option>}
                </For>
              </select>
            </Show>
          </>
        )}
      </For>
    </div>
  );
};
