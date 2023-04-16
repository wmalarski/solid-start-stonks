import { Component } from "solid-js";
import { Button, ButtonGroup } from "../Button";

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
    <ButtonGroup>
      <Button
        disabled={props.current < 1}
        onClick={onPreviousClick}
        variant={props.current < 1 ? "disabled" : "none"}
      >
        «
      </Button>
      <span>{props.current + 1}</span>
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
