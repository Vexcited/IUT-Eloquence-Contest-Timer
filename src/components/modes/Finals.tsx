import { useKeyDownEvent } from "@solid-primitives/keyboard";
import { createEffect, on, type Component } from "solid-js";
import timer from "../../stores/timer";
import Timer from "../Timer";
import { FINALS_DEFAULT_TIME_MS } from "../../utils/constants";

const FinalsMode: Component = () => {
  const event = useKeyDownEvent();

  // When pressing space, toggle (play/pause) the timer.
  createEffect(on(event, (evt) => {
    if (evt && evt.key === " ") {
      timer.toggle();
    }
  }));

  return (
    <Timer
      active={timer.isFullWidthActive}
      primaryColor="#eff1f5"
      secondaryColor="#1e1e2e"
      overTimeColor="#d20f39"
      defaultTimeMS={FINALS_DEFAULT_TIME_MS}
      start={() => timer.playFullWidth()}
    />
  )
};

export default FinalsMode;
