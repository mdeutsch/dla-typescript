import DLABounds from "./DLABounds";

type Point2D = [number, number];

export default class DLAOffsetMatrix<T> {
  private data: T[][];

  constructor(public bounds: DLABounds, public initialValue?: T) {
    this.data = [];
    for (let x = 0; x <= bounds.xmax - bounds.xmin; x++) {
      this.data[x] = [];
      for (let y = 0; y <= bounds.ymax - bounds.ymin; y++) {
        this.data[x][y] = initialValue;
      }
    }
  }

  public get(worldX: number, worldY: number): T {
    this.validate_location(worldX, worldY);

    const [localX, localY]: Point2D = this.world_to_local(worldX, worldY);
    return this.data[localX][localY];
  }

  public set(worldX: number, worldY: number, value: T): T {
    this.validate_location(worldX, worldY);

    const [localX, localY]: Point2D = this.world_to_local(worldX, worldY);
    return this.data[localX][localY] = value;
  }

  public contains(worldX: number, worldY: number): boolean {
    return this.bounds.contains(worldX, worldY);
  }

  private world_to_local(worldX: number, worldY: number): Point2D {
    return [worldX - this.bounds.xmin, worldY - this.bounds.ymin];
  }

  private validate_location(worldX: number, worldY: number): void {
    if (!this.bounds.containsX(worldX)) {
      throw new Error(`worldX = ${worldX} must be in [${this.bounds.xmin}, ${this.bounds.xmax}]`);
    } else if (!this.bounds.containsY(worldY)) {
      throw new Error(`worldY = ${worldY} must be in [${this.bounds.ymin}, ${this.bounds.ymax}]`);
    }
  }
}
