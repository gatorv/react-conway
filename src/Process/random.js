export default function randomMap(rows, cols) {
  const randMap = new Map();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const key = i + "-" + j;
      const rand = Math.random() < 0.5;
      randMap.set(key, rand);
    }
  }

  return randMap;
}
