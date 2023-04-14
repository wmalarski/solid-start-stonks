import { useI18n } from "@solid-primitives/i18n";
import clsx from "clsx";
import { Component, For, Match, Switch } from "solid-js";

type DateSelectOption = {
  value: number;
  text: string;
};

type DateSelectProps = {
  disabled: boolean;
  value: number;
  onChange: (value: number) => void;
  options: DateSelectOption[];
};

const DateSelect: Component<DateSelectProps> = (props) => {
  return (
    <select
      class={clsx("select select-bordered select-sm", {
        "select-disabled": props.disabled,
      })}
      disabled={props.disabled}
      value={props.value}
      onChange={(event) => {
        props.onChange(Number(event.target.value));
      }}
    >
      <For each={props.options}>
        {(option) => <option value={option.value}>{option.text}</option>}
      </For>
    </select>
  );
};

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
    return new Array(10).fill(2020).map((value, index) => ({
      text: formatter.format(new Date(value + index, 0, 1)),
      value: value + index,
    }));
  };

  const onDayChange = (day: number) => {
    const next = new Date(props.value);
    next.setDate(day);
    props.onChange(next);
  };

  const onMonthChange = (month: number) => {
    const next = new Date(props.value);
    next.setMonth(month);
    while (next.getMonth() !== month) {
      next.setDate(next.getDate() - 1);
    }
    props.onChange(next);
  };

  const onYearChange = (year: number) => {
    const next = new Date(props.value);
    next.setFullYear(year);
    props.onChange(next);
  };

  return (
    <div id={props.id} class="flex">
      <For each={new Intl.DateTimeFormat(locale()).formatToParts(props.value)}>
        {(part) => (
          <Switch>
            <Match when={part.type === "day"}>
              <DateSelect
                disabled={props.disabled}
                onChange={onDayChange}
                options={days()}
                value={props.value.getDate()}
              />
            </Match>
            <Match when={part.type === "literal"}>
              <span>{part.value}</span>
            </Match>
            <Match when={part.type === "month"}>
              <DateSelect
                disabled={props.disabled}
                onChange={onMonthChange}
                options={months()}
                value={props.value.getMonth()}
              />
            </Match>
            <Match when={part.type === "year"}>
              <DateSelect
                disabled={props.disabled}
                onChange={onYearChange}
                options={years()}
                value={Number(part.value)}
              />
            </Match>
          </Switch>
        )}
      </For>
    </div>
  );
};
