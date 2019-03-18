declare let module: any;

import DLABuilder from "./lib/DLABuilder";
import DLAPoint from "./lib/DLAPoint";

const size: number = 301;

const start = () => {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", String(size));
  canvas.setAttribute("height", String(size));
  document.querySelector("#canvas").appendChild(canvas);
  const context = canvas.getContext("2d");

  const builder = new DLABuilder(size);
  window.requestAnimationFrame(() => { renderFrame(builder, context); });
}

const renderFrame = (builder: DLABuilder, context: CanvasRenderingContext2D) => {
  for (let i = 0; i < 50; i++) {
    launchParticle(builder, context);
  }

  if (!builder.atMaxSize()) {
    window.requestAnimationFrame(() => { renderFrame(builder, context); });
  }
}

const launchParticle = (builder: DLABuilder, context: CanvasRenderingContext2D) => {
  const point = builder.launchParticle();

  if (point) {
    const [canvasX, canvasY] = latticeToCanvas(point);
    context.fillRect(canvasX, canvasY, 1, 1);

    const maxRadius = Math.round(builder.lattice.maxRadius);
    const mass = builder.lattice.mass();
    const summary: HTMLDivElement = document.querySelector("#summary");
    summary.innerText = `Radius: ${maxRadius}, Mass: ${mass}`;
  }
}

const latticeToCanvas = (point: DLAPoint) => {
  return [point.x + Math.floor(size / 2), point.y + Math.floor(size / 2)];
}

document.addEventListener("DOMContentLoaded", () => {
  start();
});

if (module.hot) {
  module.hot.accept();
}
