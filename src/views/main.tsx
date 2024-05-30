import { Match, Switch, type Component } from "solid-js";

import Header from "../components/Header";
import FinalsMode from "../components/modes/Finals";
import Footer from "../components/Footer";
import mode from "../stores/mode";
import SemiFinalsMode from "../components/modes/SemiFinals";

const Main: Component = () => {
  return (
    <div class="flex flex-col gap-8 items-center p-10 h-screen">
      <Header />

      <div class="flex overflow-hidden rounded-lg shadow-lg h-full mb-12 w-full max-w-[1200px]">
        <Switch>
          <Match when={mode.isSemiFinals}>
            <SemiFinalsMode />
          </Match>
          <Match when={mode.isFinals}>
            <FinalsMode />
          </Match>
        </Switch>
      </div>

      <Footer />
    </div>
  )
};

export default Main;
