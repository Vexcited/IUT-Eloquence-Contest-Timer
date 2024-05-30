/* @refresh reload */
import { render } from 'solid-js/web'
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import { Component, Show, createEffect, createSignal, on, onCleanup } from 'solid-js';
import { useKeyDownEvent } from "@solid-primitives/keyboard";

const root = document.getElementById('root')

// 3 minutes in ms
const MAX_TIMESTAMP = 4 * 60 * 1000;

type TimerKey = "LEFT" | "RIGHT"
const [currentlyActive, setCurrentlyActive] = createSignal<TimerKey | null>(null);

const Timer: Component<{
  key: TimerKey
  primaryColor: string
  secondaryColor: string
}> = (props) => {
  // in MS
  const [currentTimestamp, setCurrentTimestamp] = createSignal(MAX_TIMESTAMP);
  const active = () => currentlyActive() === props.key;
  const event = useKeyDownEvent();

  // Show in MM:SS format
  const formattedTime = () => {
    const minutes = Math.floor(currentTimestamp() / 60_000);
    const seconds = Math.floor((currentTimestamp() % 60_000) / 1000);
    const secondsAsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutes}:${secondsAsString}`;
  }

  let interval: ReturnType<typeof setInterval> | null = null;

  createEffect(on(active, (isActive) => {
    if (!isActive) {
      if (interval !== null) clearInterval(interval);
      return;
    }

    interval = setInterval(() => {
      setCurrentTimestamp((prev) => {
        if (prev <= 0) {
          setCurrentlyActive(props.key === "LEFT" ? "RIGHT" : "LEFT");
          return prev;
        }

        return prev - 1000;
      });
    }, 1_000);

    onCleanup(() => {
      if (interval !== null) clearInterval(interval);
    });
  }));

  createEffect(() => {
    const evt = event();
    if (evt) {
      if (evt.key === "r") {
        setCurrentlyActive(null);
        setCurrentTimestamp(MAX_TIMESTAMP);
      }
    }
  })

  return (
    <div
      onClick={() => {
        if (active()) setCurrentlyActive(null);
        else setCurrentlyActive(props.key)
      }}
      class="p-34 h-full flex items-center justify-center w-full relative cursor-pointer"
      style={{
        background: props.primaryColor,
        color: props.secondaryColor
      }}
    >
      <p class="text-[128px]">
        {formattedTime()}
      </p>

      <Show when={active()}>
        <div
          class="rounded-full h-3 w-3 absolute bottom-2 right-2 bg-black"
          style={{ background: props.secondaryColor }}
        />
      </Show>
    </div>
  )
}

const App = () => {
  const event = useKeyDownEvent();

  createEffect(on(event, (evt) => {
    if (evt && evt.key === " ") {
      setCurrentlyActive(currentlyActive() === "LEFT" ? "RIGHT" : "LEFT");
    }
  }));

  return (
    <div class="flex flex-col gap-8 items-center p-10 h-screen">
      <header class='flex flex-col items-center'>
        <h1 class='text-white font-extrabold text-4xl text-shadow'>
          CONCOURS D'ELOQUENCE 2024
        </h1>
        <p class='text-white text-xl'>
          IUT du Limousin - Département INFO
        </p>
      </header>

      <div class="flex overflow-hidden rounded-lg shadow-lg h-full mb-12 w-full max-w-[1200px]">
        <Timer key="LEFT" primaryColor='#fff' secondaryColor='#000' />
        {/* <Timer key="RIGHT" primaryColor='#000' secondaryColor='#fff' /> */}
      </div>
    </div>
  )
}

render(() => (
  <App />
), root!)
