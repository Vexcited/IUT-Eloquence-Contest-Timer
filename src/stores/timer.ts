import { createSignal, createRoot } from "solid-js";

enum Timer {
  NONE,
  LEFT,
  RIGHT,
  FULL_WIDTH
}

const timer = createRoot(() => {
  const [currentlyActive, setCurrentlyActive] = createSignal(Timer.NONE);
  
  /**
   * Pause the currently active timer.
   */
  const pause = (): void => {
    setCurrentlyActive(Timer.NONE);
  }

  /**
   * Switches the currently active timer. \
   * Used when the user presses the "space" key in **semi-finals mode**.
   */
  const swap = (): void => {
    setCurrentlyActive(prev => {
      if (prev === Timer.LEFT)  return Timer.RIGHT;
      if (prev === Timer.RIGHT) return Timer.LEFT;
      return prev;
    });
  };

  /**
   * Toggles the currently active timer. \
   * Used when the user presses the "space" key in **finals mode**.
   */
  const toggle = (): void => {
    setCurrentlyActive(prev => {
      if (prev === Timer.FULL_WIDTH) return Timer.NONE;
      return Timer.FULL_WIDTH;
    });
  }
  
  return {
    swap,
    pause,
    toggle,

    get isLeftActive() {
      return currentlyActive() === Timer.LEFT;
    },

    get isRightActive() {
      return currentlyActive() === Timer.RIGHT;
    },

    get isFullWidthActive() {
      return currentlyActive() === Timer.FULL_WIDTH;
    },

    playLeft() {
      setCurrentlyActive(Timer.LEFT);
    },

    playRight() {
      setCurrentlyActive(Timer.RIGHT);
    },

    playFullWidth() {
      setCurrentlyActive(Timer.FULL_WIDTH);
    }
  }
});

export default timer;
