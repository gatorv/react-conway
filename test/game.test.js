import {
  countNeighborCells,
  derivateState,
  generateNewMap
} from "../src/Process/game";

const conwayPatterns = {
  nolife: {
    rows: 2,
    cols: 2,
    map: new Map([
      ["0-0", false],
      ["0-1", false],
      ["1-0", false],
      ["1-1", false]
    ]),
    result: new Map([
      ["0-0", false],
      ["0-1", false],
      ["1-0", false],
      ["1-1", false]
    ])
  },
  block: {
    rows: 4,
    cols: 4,
    map: new Map([
      ["0-0", false],
      ["0-1", false],
      ["0-2", false],
      ["0-3", false],
      ["1-0", false],
      ["1-1", true],
      ["1-2", true],
      ["1-3", false],
      ["2-0", false],
      ["2-1", true],
      ["2-2", true],
      ["2-3", false],
      ["3-0", false],
      ["3-1", false],
      ["3-2", false],
      ["3-3", false]
    ]),
    result: new Map([
      ["0-0", false],
      ["0-1", false],
      ["0-2", false],
      ["0-3", false],
      ["1-0", false],
      ["1-1", true],
      ["1-2", true],
      ["1-3", false],
      ["2-0", false],
      ["2-1", true],
      ["2-2", true],
      ["2-3", false],
      ["3-0", false],
      ["3-1", false],
      ["3-2", false],
      ["3-3", false]
    ])
  },
  oscilator: {
    rows: 5,
    cols: 5,
    map: new Map([
      ["0-0", false],
      ["0-1", false],
      ["0-2", false],
      ["0-3", false],
      ["0-4", false],
      ["1-0", false],
      ["1-1", false],
      ["1-2", false],
      ["1-3", false],
      ["1-4", false],
      ["2-0", false],
      ["2-1", true],
      ["2-2", true],
      ["2-3", true],
      ["2-4", false],
      ["3-0", false],
      ["3-1", false],
      ["3-2", false],
      ["3-3", false],
      ["3-4", false],
      ["4-0", false],
      ["4-1", false],
      ["4-2", false],
      ["4-3", false],
      ["4-4", false]
    ]),
    result: new Map([
      ["0-0", false],
      ["0-1", false],
      ["0-2", false],
      ["0-3", false],
      ["0-4", false],
      ["1-0", false],
      ["1-1", false],
      ["1-2", true],
      ["1-3", false],
      ["1-4", false],
      ["2-0", false],
      ["2-1", false],
      ["2-2", true],
      ["2-3", false],
      ["2-4", false],
      ["3-0", false],
      ["3-1", false],
      ["3-2", true],
      ["3-3", false],
      ["3-4", false],
      ["4-0", false],
      ["4-1", false],
      ["4-2", false],
      ["4-3", false],
      ["4-4", false]
    ])
  }
};

it("Test Game Generation", () => {
  for (let testName in conwayPatterns) {
    test(`Testing ${testName}`, () => {
      const gameData = conwayPatterns[testName];
      const resultGame = generateNewMap(
        gameData.map,
        gameData.rows,
        gameData.cols
      );
      expect(resultGame).toEqual(gameData.result);
    });
  }
});

it("Test Basic Rules", () => {
  test("Any live cell with two live neighbours survives", () => {
    expect(derivateState(true, 2)).toEqual(true);
  });
  test("Any live cell with less than two live neighbours dies", () => {
    expect(derivateState(true, 1)).toEqual(false);
  });
  test("Any live cell with three live neighbours survives", () => {
    expect(derivateState(true, 3)).toEqual(true);
  });
  test("Any live cell with four live neighbours dies", () => {
    expect(derivateState(true, 4)).toEqual(false);
  });
  test("Any dead cell with three live neighbours becomes a live cell", () => {
    expect(derivateState(false, 3)).toEqual(true);
  });
  test("Any dead cells, will stay dead", () => {
    expect(derivateState(false, 0)).toEqual(false);
  });
});

it("Test Neighborhood count", () => {
  test("Count cells when only I'm alive should be 0", () => {
    const map = new Map([
      ["0-0", false],
      ["0-1", false],
      ["0-2", false],
      ["1-0", false],
      ["1-1", true],
      ["1-2", false],
      ["2-0", false],
      ["2-1", false],
      ["2-2", false]
    ]);
    const count = countNeighborCells(map, 1, 1, 2, 2);
    expect(count).toBe(0);
  });

  test("Count cells when I'm alive and two neighborhs should be two", () => {
    const map = new Map([
      ["0-0", false],
      ["0-1", false],
      ["0-2", false],
      ["1-0", true],
      ["1-1", true],
      ["1-2", true],
      ["2-0", false],
      ["2-1", false],
      ["2-2", false]
    ]);
    const count = countNeighborCells(map, 1, 1, 2, 2);
    expect(count).toBe(2);
  });

  test("Count cells when I'm alive and four neighborhs should be four", () => {
    const map = new Map([
      ["0-0", false],
      ["0-1", true],
      ["0-2", false],
      ["1-0", true],
      ["1-1", true],
      ["1-2", true],
      ["2-0", false],
      ["2-1", true],
      ["2-2", false]
    ]);
    const count = countNeighborCells(map, 1, 1, 2, 2);
    expect(count).toBe(4);
  });
});
