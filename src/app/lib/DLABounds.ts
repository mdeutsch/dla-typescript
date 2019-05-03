export default class DLABounds {
  public xmin: number;
  public xmax: number;
  public ymin: number;
  public ymax: number;

  constructor(xmin: number, xmax: number, ymin: number, ymax: number) {
    if (xmin <= xmax) {
      [this.xmin, this.xmax] = [xmin, xmax];
    } else {
      [this.xmin, this.xmax] = [xmax, xmin];
    }

    if (ymin <= ymax) {
      [this.ymin, this.ymax] = [ymin, ymax];
    } else {
      [this.ymin, this.ymax] = [ymax, ymin];
    }
  }

  public contains(x: number, y: number): boolean {
    return this.containsX(x) && this.containsY(y);
  }

  public containsX(x: number): boolean {
    return x >= this.xmin && x <= this.xmax;
  }

  public containsY(y: number): boolean {
    return y >= this.ymin && y <= this.ymax;
  }
}
