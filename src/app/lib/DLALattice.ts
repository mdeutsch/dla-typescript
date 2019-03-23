import DLAPoint from "./DLAPoint";

export default class DLALattice {
  public xmin: number;
  public xmax: number;
  public ymin: number;
  public ymax: number;
  public mass: number;
  public maxRadius: number;
  private locations: any;
  private adjacents: any;

  constructor(public size: number) {
    this.xmax = Math.floor(size / 2);
    this.xmin = this.xmax - (size - 1);
    this.ymax = this.xmax;
    this.ymin = this.xmin;
    this.mass = 0;
    this.maxRadius = 0;
    this.locations = {};
    this.adjacents = {};
  }

  public contains(x: number, y: number): boolean {
    return x >= this.xmin && x <= this.xmax && y >= this.ymin && y <= this.ymax;
  }

  public addParticle(point: DLAPoint): DLALattice {
    this.validateLocation(point.x, point.y);

    const [x, y]: number[] = point.xy;
    const newMass = this.massAt(x, y) + 1;

    this.mass++;
    this.locations[this.locationKey(x, y)] = newMass;
    this.adjacents[this.locationKey(x - 1, y)] = true;
    this.adjacents[this.locationKey(x + 1, y)] = true;
    this.adjacents[this.locationKey(x, y - 1)] = true;
    this.adjacents[this.locationKey(x, y + 1)] = true;
    this.maxRadius = Math.max(this.maxRadius, point.absValue());

    return this;
  }

  public massAt(x: number, y: number): number {
    this.validateLocation(x, y);
    return this.locations[this.locationKey(x, y)] || 0;
  }

  public isAdjacent(x: number, y: number): boolean {
    this.validateLocation(x, y);
    return this.adjacents[this.locationKey(x, y)] || false;
  }

  private locationKey(x: number, y: number): string {
    return `${x}|${y}`;
  }

  private validateLocation(x: number, y: number): void {
    if (x < this.xmin || x > this.xmax) {
      throw `x = ${x} must be in [${this.xmin}, ${this.xmax}]`
    } else if (y < this.ymin || y > this.ymax) {
      throw `y = ${y} must be in [${this.ymin}, ${this.ymax}]`
    }
  }
}
