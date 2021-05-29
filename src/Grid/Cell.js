import classnames from "classnames";

export default function Cell({ id, isAlive }) {
  return (
    <td
      id={id}
      className={classnames("Cell", { alive: isAlive })}
      data-isalive={isAlive ? "true" : "false"}
    >
      &nbsp;
    </td>
  );
}
