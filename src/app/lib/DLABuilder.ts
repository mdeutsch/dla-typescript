import DLALattice from "./DLALattice";
import DLAPoint from "./DLAPoint";

export default class DLABuilder {
  public continueProb: number;
  public lattice: DLALattice;

  constructor(private size: number) {
    this.continueProb = 0;
    this.reset();
  }

  public run(onParticleLanded: (point: DLAPoint) => void) {
    while (!this.atMaxSize()) {
      const point: DLAPoint = this.launchParticle();

      if (point) {
        onParticleLanded(point);
      }
    }
  }

  public reset(): void {
    this.lattice = new DLALattice(this.size);
    this.lattice.addParticle(new DLAPoint(0, 0));
  }

  public atMaxSize(): boolean {
    return 2 * this.lattice.maxRadius >= this.lattice.size - 20;
  }

  public launchParticle(): DLAPoint {
    let position: DLAPoint = this.randomStartingPoint(this.lattice.maxRadius + 10);
    let next: DLAPoint;
    let particleIsDone: boolean = false;
    let particleLanded: boolean = false;

    while (!particleIsDone) {
      next = this.randomNextPoint(position);

      if (next.absValue() > (3 * this.lattice.maxRadius) + 20) {
        particleIsDone = true;
      } else if (!this.lattice.contains(next.x, next.y)) {
        particleIsDone = true;
      } else if (this.lattice.isAdjacent(next.x, next.y) && Math.random() > this.continueProb) {
        this.lattice.addParticle(next);
        particleIsDone = true;
        particleLanded = true;
      } else {
        position = next;
      }
    }

    return particleLanded ? next : null;
  }

  private randomStartingPoint(radius: number) {
    const theta: number = Math.random() * 2 * Math.PI;

    const x: number = Math.round(radius * Math.cos(theta));
    const y: number = Math.round(radius * Math.sin(theta));

    return new DLAPoint(x, y);
  }

  private randomNextPoint(point: DLAPoint): DLAPoint {
    switch(Math.floor(Math.random() * 4)) {
      case 0:
        return new DLAPoint(point.x - 1, point.y);
      case 1:
        return new DLAPoint(point.x + 1, point.y);
      case 2:
        return new DLAPoint(point.x, point.y - 1);
      case 3:
        return new DLAPoint(point.x, point.y + 1);
    }
  }
}
