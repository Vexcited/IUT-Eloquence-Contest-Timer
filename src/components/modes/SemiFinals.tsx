import { useKeyDownEvent } from "@solid-primitives/keyboard";
import { createEffect, on, type Component } from "solid-js";
import timer from "../../stores/timer";
import Timer from "../Timer";
import { SEMI_FINALS_DEFAULT_TIME_MS } from "../../utils/constants";

const SemiFinalsMode: Component = () => {
  const event = useKeyDownEvent();

  // When pressing space, swap the timers.
  createEffect(on(event, (evt) => {
    if (evt) {
      switch (evt.key) {
        case " ":
          timer.swap();
          break;
        case "ArrowLeft":
          if (timer.isLeftActive) timer.pause();
          else timer.playLeft();
          break;
        case "ArrowRight":
          if (timer.isRightActive) timer.pause();
          else timer.playRight();
          break;
      }
    }
  }));

  return (
    <>
      <Timer
        active={timer.isLeftActive}
        primaryColor="#eff1f5"
        secondaryColor="#1e1e2e"
        overTimeColor="#d20f39"
        defaultTimeMS={SEMI_FINALS_DEFAULT_TIME_MS}
        start={() => timer.playLeft()}
      />
      
      <Timer
        active={timer.isRightActive}
        primaryColor="#1e1e2e"
        secondaryColor="#eff1f5"
        overTimeColor="#f38ba8"
        defaultTimeMS={SEMI_FINALS_DEFAULT_TIME_MS}
        start={() => timer.playRight()}
      />
    </>
  )
};

export default SemiFinalsMode;
