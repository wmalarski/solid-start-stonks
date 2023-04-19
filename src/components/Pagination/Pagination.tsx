import type { Component } from "solid-js";
import { Button, ButtonGroup } from "../Button";

export type PaginationProps = {
  current: number;
  max: number;
  onChange: (value: number) => void;
};

export const Pagination: Component<PaginationProps> = (props) => {
  const onPreviousClick = () => {
    props.onChange(props.current - 1);
  };

  const onNextClick = () => {
    props.onChange(props.current + 1);
  };

  return (
    <ButtonGroup>
      <Button
        disabled={props.current < 1}
        onClick={onPreviousClick}
        variant={props.current < 1 ? "disabled" : "none"}
      >
        «
      </Button>
      <Button variant="active">{props.current + 1}</Button>
      <Button
        disabled={props.current + 1 >= props.max}
        onClick={onNextClick}
        variant={props.current + 1 >= props.max ? "disabled" : "none"}
      >
        »
      </Button>
    </ButtonGroup>
  );
};
