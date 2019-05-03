import DLABounds from "./DLABounds";
import DLAOffsetMatrix from "./DLAOffsetMatrix";

describe("get and set", () => {
  let matrix: DLAOffsetMatrix<number>;

  beforeEach(() => {
    matrix = new DLAOffsetMatrix<number>(new DLABounds(-2, 2, -3, 3));
  });

  test("retrieves a value at a negative location", () => {
    matrix.set(-2, -3, 99);
    expect(matrix.get(-2, -3)).toBe(99);
  });

  test("retrieves a value at a positive location", () => {
    matrix.set(2, 3, 99);
    expect(matrix.get(2, 3)).toBe(99);
  });
});

describe("initial value", () => {
  test("is undefined when not specified", () => {
    const matrix = new DLAOffsetMatrix<number>(new DLABounds(-2, 2, -3, 3));
    expect(matrix.get(0, 0)).toBeUndefined();
  });

  test("can be specified", () => {
    const matrix = new DLAOffsetMatrix<number>(new DLABounds(-2, 2, -3, 3), 99);
    expect(matrix.get(0, 0)).toBe(99);
  });
});

describe("contains()", () => {
  test("delegates to the bounds", () => {
    const matrix = new DLAOffsetMatrix<number>(new DLABounds(-2, 2, -3, 3));
    expect(matrix.contains(1, 1)).toBe(true);
  });
});
