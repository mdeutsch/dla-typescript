import DLAPoint from "./DLAPoint";

export default class DLALattice {
  public xmin: number;
  public xmax: number;
  public ymin: number;
  public ymax: number;
  private particles: Array<Array<number>>;
  private locations: any;
  private adjacents: any;
  public maxRadius: number;

  constructor(public size: number) {
    this.xmax = Math.floor(size / 2);
    this.xmin = this.xmax - (size - 1);
    this.ymax = this.xmax;
    this.ymin = this.xmin;
    this.particles = new Array<Array<number>>();
    this.locations = {};
    this.adjacents = {};
    this.maxRadius = 0;
  }

  public contains(x: number, y: number): boolean {
    return x >= this.xmin && x <= this.xmax && y >= this.ymin && y <= this.ymax;
  }

  public addParticle(point: DLAPoint): DLALattice {
    this.validateLocation(point.x, point.y);

    const [x, y]: number[] = point.xy;
    const newMass = this.massAt(x, y) + 1;

    this.particles.push([x, y]);
    this.locations[this.locationKey(x, y)] = newMass;
    this.adjacents[this.locationKey(x - 1, y)] = true;
    this.adjacents[this.locationKey(x + 1, y)] = true;
    this.adjacents[this.locationKey(x, y - 1)] = true;
    this.adjacents[this.locationKey(x, y + 1)] = true;
    this.maxRadius = Math.max(this.maxRadius, point.absValue());

    return this;
  }

  public getParticle(index: number): DLAPoint {
    const [x, y]: number[] = this.particles[index];
    return new DLAPoint(x, y);
  }

  public mass(): number {
    return this.particles.length;
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
