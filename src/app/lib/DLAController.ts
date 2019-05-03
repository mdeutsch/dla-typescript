import DLABuilder from "./DLABuilder";
import DLAPoint from "./DLAPoint";
import DLAView from "./DLAView";

enum RunningStatus {
  Stopped,
  Running
}

export default class DLAController {
  private context: CanvasRenderingContext2D;
  private state: RunningStatus;
  private size: number;

  constructor(private builder: DLABuilder, private view: DLAView) {
    this.state = RunningStatus.Stopped;
    this.size = this.view.getSize();

    this.view.onStart(this.start.bind(this));
    this.view.onStop(this.stop.bind(this));
    this.view.onReset(this.reset.bind(this));

    this.context = this.view.getCanvasContext();

    this.reset();
  }

  private start(): void {
    if (this.state !== RunningStatus.Running) {
      this.state = RunningStatus.Running;
      window.requestAnimationFrame(() => { this.renderFrame(); });
    }
  }

  private stop(): void {
    this.state = RunningStatus.Stopped;
  }

  private reset(): void {
    stop();
    this.builder.reset();
    this.renderInitialCanvas();
    this.view.setSummary(null);
  }

  private renderInitialCanvas(): void {
    this.context.clearRect(0, 0, this.size, this.size);

    this.context.strokeStyle = "rgb(100, 100, 100)";
    this.context.beginPath();
    this.context.arc(this.size / 2, this.size / 2, (this.size / 2) - 1, 0, 2 * Math.PI);
    this.context.stroke();
  }

  private renderFrame(): void {
    if (this.state !== RunningStatus.Running) {
      return;
    }

    for (let i = 0; i < 10; i++) {
      this.launchParticle();
    }

    if (this.builder.atMaxSize()) {
      this.stop();
    } else {
      window.requestAnimationFrame(() => { this.renderFrame(); });
    }
  }

  private launchParticle(): void {
    const point = this.builder.launchParticle();

    if (point) {
      const maxRadius = Math.round(this.builder.lattice.maxRadius);
      const mass = this.builder.lattice.mass;
      const hue = (5000 * mass / (Math.pow(this.size, 2))) % 255;
      const [canvasX, canvasY] = this.latticeToCanvas(point);

      this.context.fillStyle = `hsl(${hue}, 80%, 30%)`;
      this.context.fillRect(canvasX, canvasY, 1, 1);
      this.view.setSummary(`Radius: ${maxRadius}, Mass: ${mass}`);
    }
  }

  private latticeToCanvas(point: DLAPoint): Array<number> {
    const size = this.view.getSize();
    return [point.x + Math.floor(size / 2), point.y + Math.floor(size / 2)];
  }
}
