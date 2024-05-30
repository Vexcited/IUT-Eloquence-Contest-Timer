import { type Component } from "solid-js";

const Header: Component = () => {
  const currentYear = new Date().getFullYear();

  return (
    <header class="flex flex-col items-center">
      <h1 class="text-white font-extrabold text-4xl uppercase">
        Concours d'éloquence {currentYear}
      </h1>

      <p class="text-white text-xl">
        IUT du Limousin - Département INFO
      </p>
    </header>
  )
};

export default Header;