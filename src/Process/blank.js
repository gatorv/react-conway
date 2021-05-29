import toKey from "../Util/toKey";

export default function generateBlankMap(rows, cols) {
  const newMap = new Map();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const key = toKey(i, j);
      newMap.set(key, false);
    }
  }

  return newMap;
}
