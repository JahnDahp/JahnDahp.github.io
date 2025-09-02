import "../PlayStyles/StrategyCell.css";

interface Props {
  type: string;
  value: number;
  row?: number;
  col?: number;
  onChange?: (row: number, col: number, newValue: number) => void;
}

const StrategyCell = ({ type, value, row, col, onChange }: Props) => {
  const labelMap: Record<string, string[]> = {
    hard: ["S", "H", "D"],
    soft: ["S", "H", "D", "Ds"],
    split: ["N", "Y", "DAS"],
    surrender: ["N", "Sur"],
  };

  const labels = labelMap[type] || [];
  const current = value < labels.length ? value : 0;

  const handleClick = () => {
    const newValue = (current + 1) % labels.length;
    if (onChange && row !== undefined && col !== undefined)
      onChange(row, col, newValue);
  };

  const label = labels[current] || type;

  return (
    <div
      className="strategy-cell"
      onClick={handleClick}
      style={{
        backgroundColor:
          label === "H" || label === "Sur"
            ? "red"
            : label === "S" || label === "N"
            ? "darkgoldenrod"
            : label === "Ds" || label === "DAS"
            ? "seagreen"
            : label === "D" || label === "Y"
            ? "green"
            : "grey",
      }}
    >
      <p className="strategy-cell-label">{label}</p>
    </div>
  );
};

export default StrategyCell;
