export default class DLAView {
  private startButton: Element;
  private stopButton: Element;
  private resetButton: Element;
  private canvas: HTMLCanvasElement;
  private summary: HTMLDivElement;

  constructor(private container: Element, private size: number) {
    this.startButton = container.querySelector(".dla-start-button");
    this.stopButton = container.querySelector(".dla-stop-button");
    this.resetButton = container.querySelector(".dla-reset-button");
    this.summary = container.querySelector(".dla-summary");
    this.canvas = container.querySelector("canvas");
    this.canvas.setAttribute("width", String(this.size));
    this.canvas.setAttribute("height", String(this.size));
  }

  public getSize(): number {
    return this.size;
  }

  public getCanvasContext(): CanvasRenderingContext2D {
    return this.canvas.getContext("2d");
  }

  public setSummary(html: string): DLAView {
    this.summary.innerHTML = html;
    return this;
  }

  public onStart(listener: EventListener): void {
    this.startButton.addEventListener("click", listener);
  }

  public onStop(listener: EventListener): void {
    this.stopButton.addEventListener("click", listener);
  }

  public onReset(listener: EventListener): void {
    this.resetButton.addEventListener("click", listener);
  }
}
