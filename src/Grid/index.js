import { forwardRef } from "react";
import toKey from "../Util/toKey";
import Cell from "./Cell";

const Grid = ({ rows, cols, stateMap }, ref) => {
  const gridTable = [];
  for (var i = 0; i <= rows; i++) {
    const gridRow = [];
    for (var j = 0; j <= cols; j++) {
      const key = toKey(i, j);
      gridRow.push(<Cell key={key} id={key} isAlive={stateMap.get(key)} />);
    }
    gridTable.push(gridRow);
  }
  return (
    <table ref={ref}>
      <tbody>
        {gridTable.map((thisRow, index) => (
          <tr key={index}>{thisRow}</tr>
        ))}
      </tbody>
    </table>
  );
};

export default forwardRef(Grid);
