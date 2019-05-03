import DLABounds from "./DLABounds";
import DLAOffsetMatrix from "./DLAOffsetMatrix";
import DLAPoint from "./DLAPoint";

export default class DLALattice {
  public bounds: DLABounds;
  public mass: number;
  public maxRadius: number;
  private masses: DLAOffsetMatrix<number>;
  private adjacents: DLAOffsetMatrix<boolean>;

  constructor(public size: number) {
    const upperBound = Math.floor(size / 2);
    const lowerBound = upperBound - (size - 1);
    this.bounds = new DLABounds(lowerBound, upperBound, lowerBound, upperBound);
    const adjacentBounds = new DLABounds(lowerBound - 1, upperBound + 1, lowerBound - 1, upperBound + 1);

    this.mass = 0;
    this.maxRadius = 0;
    this.masses = new DLAOffsetMatrix<number>(this.bounds, 0);
    this.adjacents = new DLAOffsetMatrix<boolean>(adjacentBounds, false);
  }

  public contains(x: number, y: number): boolean {
    return this.masses.contains(x, y);
  }

  public addParticle(point: DLAPoint): DLALattice {
    this.mass++;
    this.masses.set(point.x, point.y, this.massAt(point.x, point.y) + 1);

    this.adjacents.set(point.x - 1, point.y, true);
    this.adjacents.set(point.x + 1, point.y, true);
    this.adjacents.set(point.x, point.y - 1, true);
    this.adjacents.set(point.x, point.y + 1, true);
    this.maxRadius = Math.max(this.maxRadius, point.absValue());

    return this;
  }

  public massAt(x: number, y: number): number {
    return this.masses.get(x, y);
  }

  public isAdjacent(x: number, y: number): boolean {
    return this.adjacents.get(x, y);
  }
}
