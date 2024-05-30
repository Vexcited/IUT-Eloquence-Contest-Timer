/* @refresh reload */
import { render } from 'solid-js/web'
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import Main from './views/main';

render(
  () => <Main />,
  document.getElementById('root') as HTMLDivElement
);
