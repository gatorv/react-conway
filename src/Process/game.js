import toKey from "../Util/toKey";

const generateNewMap = (gameMap, rows, cols) => {
  const newMap = new Map();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const key = toKey(i, j);
      const currState = gameMap.get(key);
      const neighbors = countNeighborCells(gameMap, i, j, rows, cols);
      newMap.set(key, derivateState(currState, neighbors));
    }
  }

  return newMap;
};

const derivateState = (currentState, neighbors) => {
  let newState = currentState;
  if (currentState === false && neighbors === 3) {
    newState = true; // alive
  } else if (currentState === true && (neighbors < 2 || neighbors > 3)) {
    newState = false; // dead
  }

  return newState;
};

const countNeighborCells = (gameMap, x, y, rows, cols) => {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const col = (x + i + cols) % cols;
      const row = (y + j + rows) % rows;
      const key = toKey(col, row);
      sum += gameMap.get(key) === true ? 1 : 0;
    }
  }

  // Remove current cell
  sum -= gameMap.get(toKey(x, y)) === true ? 1 : 0;

  return sum;
};

export { derivateState, countNeighborCells, generateNewMap };
