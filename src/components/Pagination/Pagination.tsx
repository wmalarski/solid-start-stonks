import clsx from "clsx";
import { Component } from "solid-js";

type Props = {
  current: number;
  max: number;
  onChange: (value: number) => void;
};

export const Pagination: Component<Props> = (props) => {
  const onPreviousClick = () => {
    props.onChange(props.current - 1);
  };

  const onNextClick = () => {
    props.onChange(props.current + 1);
  };

  return (
    <div class="btn-group">
      <button
        class={clsx("btn", { "btn-disabled": props.current < 1 })}
        disabled={props.current < 1}
        onClick={onPreviousClick}
      >
        «
      </button>
      <button class="btn">{props.current + 1}</button>
      <button
        class={clsx("btn", { "btn-disabled": props.current + 1 >= props.max })}
        disabled={props.current + 1 >= props.max}
        onClick={onNextClick}
      >
        »
      </button>
    </div>
  );
};
