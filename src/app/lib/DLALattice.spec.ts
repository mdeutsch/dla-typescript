import DLALattice from './DLALattice'
import DLAPoint from './DLAPoint';

describe('constructor', () => {
  test('sets bounds for an odd size', () => {
    const lattice = new DLALattice(5);
    expect(lattice.xmin).toBe(-2);
    expect(lattice.xmax).toBe(2);
    expect(lattice.ymin).toBe(-2);
    expect(lattice.ymax).toBe(2);
  });

  test('sets bounds for an even size', () => {
    const lattice = new DLALattice(6);
    expect(lattice.xmin).toBe(-2);
    expect(lattice.xmax).toBe(3);
    expect(lattice.ymin).toBe(-2);
    expect(lattice.ymax).toBe(3);
  });
});

describe('add()', () => {
  test('stores the point', () => {
    const lattice = new DLALattice(5);
    lattice.addParticle(new DLAPoint(1, 1));

    expect(lattice.getParticle(0)).toStrictEqual(new DLAPoint(1, 1));
  });

  test('returns the lattice', () => {
    const lattice = new DLALattice(5);

    expect(lattice.addParticle(new DLAPoint(1, 1))).toBe(lattice);
  });
});

describe('mass()', () => {
  test('is zero for a new lattice', () => {
    const lattice = new DLALattice(5);

    expect(lattice.mass()).toEqual(0);
  });

  test('is the number of particles', () => {
    const lattice = new DLALattice(5);
    lattice.addParticle(new DLAPoint(1, 1));
    lattice.addParticle(new DLAPoint(1, 1));
    lattice.addParticle(new DLAPoint(2, 1));

    expect(lattice.mass()).toEqual(3);
  });
});

describe('massAt()', () => {
  test('is zero for a location with no particles', () => {
    const lattice = new DLALattice(5);
    lattice.addParticle(new DLAPoint(1, 1));

    expect(lattice.massAt(2, 2)).toEqual(0);
  });

  test('is the number of particles at a location', () => {
    const lattice = new DLALattice(5);
    lattice.addParticle(new DLAPoint(1, 1));
    lattice.addParticle(new DLAPoint(1, 1));
    lattice.addParticle(new DLAPoint(2, 1));

    expect(lattice.massAt(1, 1)).toEqual(2);
    expect(lattice.massAt(2, 1)).toEqual(1);
  });
});
