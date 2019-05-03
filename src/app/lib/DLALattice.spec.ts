import DLALattice from "./DLALattice"
import DLAPoint from "./DLAPoint";

describe("constructor", () => {
  test("sets bounds for an odd size", () => {
    const lattice = new DLALattice(5);
    expect(lattice.bounds.xmin).toBe(-2);
    expect(lattice.bounds.xmax).toBe(2);
    expect(lattice.bounds.ymin).toBe(-2);
    expect(lattice.bounds.ymax).toBe(2);
  });

  test("sets bounds for an even size", () => {
    const lattice = new DLALattice(6);
    expect(lattice.bounds.xmin).toBe(-2);
    expect(lattice.bounds.xmax).toBe(3);
    expect(lattice.bounds.ymin).toBe(-2);
    expect(lattice.bounds.ymax).toBe(3);
  });
});

describe("add()", () => {
  test("increases the mass", () => {
    const lattice = new DLALattice(5);
    lattice.addParticle(new DLAPoint(1, 1));

    expect(lattice.mass).toEqual(1);
  });

  test("returns the lattice", () => {
    const lattice = new DLALattice(5);

    expect(lattice.addParticle(new DLAPoint(1, 1))).toBe(lattice);
  });
});

describe("mass()", () => {
  test("is zero for a new lattice", () => {
    const lattice = new DLALattice(5);

    expect(lattice.mass).toEqual(0);
  });

  test("is the number of particles", () => {
    const lattice = new DLALattice(5);
    lattice.addParticle(new DLAPoint(1, 1));
    lattice.addParticle(new DLAPoint(1, 1));
    lattice.addParticle(new DLAPoint(2, 1));

    expect(lattice.mass).toEqual(3);
  });
});

describe("massAt()", () => {
  test("is zero for a location with no particles", () => {
    const lattice = new DLALattice(5);
    lattice.addParticle(new DLAPoint(1, 1));

    expect(lattice.massAt(2, 2)).toEqual(0);
  });

  test("is the number of particles at a location", () => {
    const lattice = new DLALattice(5);
    lattice.addParticle(new DLAPoint(1, 1));
    lattice.addParticle(new DLAPoint(1, 1));
    lattice.addParticle(new DLAPoint(2, 1));

    expect(lattice.massAt(1, 1)).toEqual(2);
    expect(lattice.massAt(2, 1)).toEqual(1);
  });
});
