import { useRef, useState, useEffect, useCallback } from "react";
import Grid from "./Grid";
import blank from "./Process/blank";
import random from "./Process/random";
import { generateNewMap } from "./Process/game";

import "./styles.css";

export default function App() {
  const rows = 20;
  const cols = 20;
  const gridRef = useRef();
  const [gridMap, setGridMap] = useState(blank(rows, cols));

  const handleClick = useCallback((e) => {
    if (gridRef && gridRef.current && gridRef.current.contains(e.target)) {
      const cell = e.target.id;
      const isAlive = e.target.getAttribute("data-isalive") === "true";
      setGridMap((prev) => new Map(prev).set(cell, !isAlive));
      return;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const randomFill = () => {
    setGridMap(() => random(rows, cols));
  };

  const clearBoard = () => {
    setGridMap(() => blank(rows, cols));
  };

  const nextCycle = () => {
    setGridMap((prev) => generateNewMap(prev, rows, cols));
  };

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <button onClick={() => randomFill()}>Random Fill</button>
      <button onClick={() => clearBoard()}>Clear Board</button>
      <button onClick={() => nextCycle()}>Next Life Cycle</button>

      <Grid ref={gridRef} rows={rows} cols={cols} stateMap={gridMap} />
    </div>
  );
}
