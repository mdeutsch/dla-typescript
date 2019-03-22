import DLABuilder from "./DLABuilder";
import DLAPoint from "./DLAPoint";
import DLAView from "./DLAView";

export default class DLAController {
  private context: CanvasRenderingContext2D;
  private state: string;

  constructor(private builder: DLABuilder, private view: DLAView) {
    this.state = "stopped";

    this.view.onStart(this.start.bind(this));
    this.view.onStop(this.stop.bind(this));
    this.view.onReset(this.reset.bind(this));

    this.context = this.view.getCanvasContext();
  }

  private start(): void {
    this.state = "running";
    window.requestAnimationFrame(() => { this.renderFrame(); });
  }

  private stop(): void {
    this.state = "stopped";
  }

  private reset(): void {
    stop();
    this.builder.reset();
    this.view.reset();
  }

  private renderFrame(): void {
    if (this.state !== "running") {
      return;
    }

    for (let i = 0; i < 10; i++) {
      this.launchParticle();
    }

    if (!this.builder.atMaxSize()) {
      window.requestAnimationFrame(() => { this.renderFrame(); });
    }
  }

  private launchParticle(): void {
    const point = this.builder.launchParticle();

    if (point) {
      const [canvasX, canvasY] = this.latticeToCanvas(point);
      this.context.fillRect(canvasX, canvasY, 1, 1);

      const maxRadius = Math.round(this.builder.lattice.maxRadius);
      const mass = this.builder.lattice.mass();
      const summary: HTMLDivElement = document.querySelector(".dla-summary");
      summary.innerText = `Radius: ${maxRadius}, Mass: ${mass}`;
    }
  }

  private latticeToCanvas(point: DLAPoint): Array<number> {
    const size = this.view.getSize();
    return [point.x + Math.floor(size / 2), point.y + Math.floor(size / 2)];
  }
}
