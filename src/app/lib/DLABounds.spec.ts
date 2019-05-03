import DLABounds from "./DLABounds";

describe("constructor", () => {
  test("accepts bounds in order", () => {
    const bounds = new DLABounds(1, 2, 3, 4);

    expect(bounds.xmin).toBe(1);
    expect(bounds.xmax).toBe(2);
    expect(bounds.ymin).toBe(3);
    expect(bounds.ymax).toBe(4);
  });

  test("accepts x bounds out of order", () => {
    const bounds = new DLABounds(2, 1, 3, 4);

    expect(bounds.xmin).toBe(1);
    expect(bounds.xmax).toBe(2);
  });

  test("accepts y bounds out of order", () => {
    const bounds = new DLABounds(1, 2, 4, 3);

    expect(bounds.ymin).toBe(3);
    expect(bounds.ymax).toBe(4);
  });
});

describe("contains()", () => {
  let bounds: DLABounds;

  beforeEach(() => {
    bounds = new DLABounds(10, 19, 30, 39);
  });

  test("is true when x and y are in bounds", () => {
    expect(bounds.contains(15, 35)).toBe(true);
  });

  test("is false when x is out of bounds", () => {
    expect(bounds.contains(20, 35)).toBe(false);
  });

  test("is false when y is out of bounds", () => {
    expect(bounds.contains(15, 40)).toBe(false);
  });
});

describe("containsX()", () => {
  let bounds: DLABounds;

  beforeEach(() => {
    bounds = new DLABounds(10, 20, 5, 25);
  });

  test("is false when x is below the lower bound", () => {
    expect(bounds.containsX(9)).toBe(false);
  });

  test("is true when x is at the lower bound", () => {
    expect(bounds.containsX(10)).toBe(true);
  });

  test("is true when x is at the upper bound", () => {
    expect(bounds.containsX(20)).toBe(true);
  });

  test("is false when x is above the upper bound", () => {
    expect(bounds.containsX(21)).toBe(false);
  });
});

describe("containsY()", () => {
  let bounds: DLABounds;

  beforeEach(() => {
    bounds = new DLABounds(5, 25, 10, 20);
  });

  test("is false when y is below the lower bound", () => {
    expect(bounds.containsY(9)).toBe(false);
  });

  test("is true when y is at the lower bound", () => {
    expect(bounds.containsY(10)).toBe(true);
  });

  test("is true when y is at the upper bound", () => {
    expect(bounds.containsY(20)).toBe(true);
  });

  test("is false when y is above the upper bound", () => {
    expect(bounds.containsY(21)).toBe(false);
  });
});
