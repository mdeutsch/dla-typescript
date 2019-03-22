declare let module: any;

import DLABuilder from "./lib/DLABuilder";
import DLAController from "./lib/DLAController";
import DLAView from "./lib/DLAView";

const size = 301;
let controller;

document.addEventListener("DOMContentLoaded", () => {
  const container: HTMLDivElement = document.querySelector(".dla-component");
  const view = new DLAView(container, size);
  const builder = new DLABuilder(size);

  controller = new DLAController(builder, view);
});

if (module.hot) {
  module.hot.accept();
}
