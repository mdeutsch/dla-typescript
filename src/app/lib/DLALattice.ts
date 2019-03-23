import DLAPoint from "./DLAPoint";

export default class DLALattice {
  public xmin: number;
  public xmax: number;
  public ymin: number;
  public ymax: number;
  public mass: number;
  public maxRadius: number;
  private masses: number[][];
  private adjacents: boolean[][];

  constructor(public size: number) {
    this.xmax = Math.floor(size / 2);
    this.xmin = this.xmax - (size - 1);
    this.ymax = this.xmax;
    this.ymin = this.xmin;
    this.mass = 0;
    this.maxRadius = 0;

    this.masses = [];
    this.adjacents = [];
    for (let i = this.xmin; i <= this.xmax; i++) {
      this.masses[i] = [];
      this.adjacents[i] = [];
    }
  }

  public contains(x: number, y: number): boolean {
    return x >= this.xmin && x <= this.xmax && y >= this.ymin && y <= this.ymax;
  }

  public addParticle(point: DLAPoint): DLALattice {
    this.validateLocation(point.x, point.y);

    this.mass++;
    this.masses[point.x][point.y] = this.massAt(point.x, point.y) + 1;

    this.adjacents[point.x - 1][point.y] = true;
    this.adjacents[point.x + 1][point.y] = true;
    this.adjacents[point.x][point.y - 1] = true;
    this.adjacents[point.x][point.y + 1] = true;
    this.maxRadius = Math.max(this.maxRadius, point.absValue());

    return this;
  }

  public massAt(x: number, y: number): number {
    this.validateLocation(x, y);
    return this.masses[x][y] || 0;
  }

  public isAdjacent(x: number, y: number): boolean {
    this.validateLocation(x, y);
    return this.adjacents[x][y] || false;
  }

  private validateLocation(x: number, y: number): void {
    if (x < this.xmin || x > this.xmax) {
      throw `x = ${x} must be in [${this.xmin}, ${this.xmax}]`
    } else if (y < this.ymin || y > this.ymax) {
      throw `y = ${y} must be in [${this.ymin}, ${this.ymax}]`
    }
  }
}
