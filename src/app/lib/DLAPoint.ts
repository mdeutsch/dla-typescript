export default class DLAPoint {
  constructor(public x: number, public y: number) {
  }

  public get xy(): number[] {
    return [this.x, this.y];
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  public left(): DLAPoint {
    return new DLAPoint(this.x - 1, this.y);
  }

  public right(): DLAPoint {
    return new DLAPoint(this.x + 1, this.y);
  }

  public up(): DLAPoint {
    return new DLAPoint(this.x, this.y - 1);
  }

  public down(): DLAPoint {
    return new DLAPoint(this.x, this.y + 1);
  }

  public absValue(): number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y))
  }
}
