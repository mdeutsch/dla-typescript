export default class DLAPoint {
  constructor(public x: number, public y: number) {
  }

  public get xy(): number[] {
    return [this.x, this.y];
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  public absValue(): number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y))
  }
}
