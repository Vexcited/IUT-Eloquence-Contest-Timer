import { Match, Switch, type Component } from "solid-js";
import mode from "../stores/mode";
import timer from "../stores/timer";

const Footer: Component = () => {
  return (
    <footer class="flex flex-col items-center">
      <button class="text-white font-extrabold text-4xl uppercase"
        type="button"
        onKeyPress={(e) => {
          e.preventDefault();
        }}
        onClick={(e) => {
          e.stopPropagation();
          timer.pause();
          mode.toggle();
        }}
      >
        <Switch>
          <Match when={mode.isSemiFinals}>
            Demi-finales
          </Match>
          <Match when={mode.isFinals}>
            Finales
          </Match>
        </Switch>
      </button>
    </footer>
  )
};

export default Footer;