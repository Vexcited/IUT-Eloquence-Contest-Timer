import { type Component, createSignal, createEffect, on, batch, onCleanup, Show } from "solid-js";
import { useKeyDownEvent } from "@solid-primitives/keyboard";
import timer from "../stores/timer";

const Timer: Component<{
  /** When `true`, the timer is running. */
  active: boolean
  
  /** Background color of the box. */
  primaryColor: string
  /** Color of the text and elements inside the box. */
  secondaryColor: string
  overTimeColor: string

  /** When pressing `r` to reset, the value goes back to this. */
  defaultTimeMS: number

  /** Should start the timer in stores. */
  start: () => void
}> = (props) => {
  const [currentTimeMS, setCurrentTimeMS] = createSignal(props.defaultTimeMS);
  const isOverTime = () => currentTimeMS() <= 0;
  const keyDown = useKeyDownEvent();

  // Show in MM:SS format
  // If negative, show -MM:SS format
  const formattedTime = () => {
    let timeMS = Math.abs(currentTimeMS());

    const minutes = Math.floor(timeMS / 60_000);
    const seconds = Math.floor((timeMS % 60_000) / 1000);
    const secondsAsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutes}:${secondsAsString}`;
  }

  let interval: ReturnType<typeof setInterval> | null = null;
  const cleanInterval = (): void => {
    if (interval !== null)
      clearInterval(interval);
  };

  createEffect(on(() => props.active, (isActive) => {
    if (!isActive) {
      cleanInterval();
      return;
    }

    // Every 100ms, decrement the current timestamp by 100ms.
    interval = setInterval(() => {
      setCurrentTimeMS((prev) => prev - 100);
    }, 100);

    onCleanup(() => {
      cleanInterval();
    });
  }));

  // If the user presses "r", reset the timer to default timestamp.
  createEffect(on(keyDown, (event) => {
    if (event && event.key === "r") {
      batch(() => {
        timer.pause();
        setCurrentTimeMS(props.defaultTimeMS);
      });
    }
  }));

  return (
    <div
      onClick={() => {
        if (props.active) timer.pause();
        else props.start();
      }}
      class="w-full p-34 h-full flex flex-col items-center justify-center relative cursor-pointer"
      style={{
        background: props.primaryColor,
        color: props.secondaryColor
      }}
    >
      <p class="text-[128px] font-medium"
        style={{
          color: isOverTime() ? props.overTimeColor : props.secondaryColor
        }}
      >
        {formattedTime()}
      </p>

      {/* <Show when={isOverTime()}>
        <p style={{ color: props.overTimeColor }}>
          de temps dépassé
        </p>
      </Show> */}

      <Show when={props.active}>
        <div
          class="rounded-full h-3 w-3 absolute bottom-2 right-2 bg-black"
          style={{ background: props.secondaryColor }}
        />
      </Show>
    </div>
  )
};

export default Timer;
