import { createRoot, createSignal } from "solid-js";

enum Mode {
  SEMI_FINALS,
  FINALS
}

const mode = createRoot(() => {
  const [currentMode, setCurrentMode] = createSignal(Mode.SEMI_FINALS);

  const toggle = () => {
    setCurrentMode(prev => {
      if (prev === Mode.SEMI_FINALS) return Mode.FINALS;
      return Mode.SEMI_FINALS;
    });
  };

  return {
    toggle,

    get isSemiFinals() {
      return currentMode() === Mode.SEMI_FINALS;
    },

    get isFinals() {
      return currentMode() === Mode.FINALS;
    }
  };
});

export default mode;
