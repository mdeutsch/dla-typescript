import DLAPoint from './DLAPoint'

describe('toString()', () => {
  test('renders to a string', () => {
    expect(new DLAPoint(5, 3).toString()).toBe('(5, 3)');
  });
});

describe('directions', () => {
  const initialValue = () => { return new DLAPoint(5, 3); };

  test('up()', () => {
    expect(initialValue().up()).toStrictEqual(new DLAPoint(5, 2));
  });

  test('down()', () => {
    expect(initialValue().down()).toStrictEqual(new DLAPoint(5, 4));
  });

  test('left()', () => {
    expect(initialValue().left()).toStrictEqual(new DLAPoint(4, 3));
  });

  test('right()', () => {
    expect(initialValue().right()).toStrictEqual(new DLAPoint(6, 3));
  });
})

describe('absValue()', () => {
  test('of a positive point', () => {
    expect(new DLAPoint(2, 2).absValue()).toBeCloseTo(Math.sqrt(8), 4);
  });

  test('of a zero point', () => {
    expect(new DLAPoint(0, 0).absValue()).toBe(0);
  });

  test('of a negative point', () => {
    expect(new DLAPoint(-2, -2).absValue()).toBeCloseTo(Math.sqrt(8), 4);
  });
});
