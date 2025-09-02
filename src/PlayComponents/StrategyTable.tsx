import "../PlayStyles/StrategyTable.css";
import { StrategySettingsObject } from "../SettingsObjects";
import StrategyCell from "./StrategyCell";

interface Props {
  hardMatrix: number[][];
  softMatrix: number[][];
  splitMatrix: number[][];
  surrenderMatrix: number[][];
  onChange: (updates: Partial<StrategySettingsObject>) => void;
}

const StrategyTable = ({
  hardMatrix,
  softMatrix,
  splitMatrix,
  surrenderMatrix,
  onChange,
}: Props) => {
  const columnLabels = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"];
  const hardRowLabels = [
    "21",
    "20",
    "19",
    "18",
    "17",
    "16",
    "15",
    "14",
    "13",
    "12",
    "11",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
  ];
  const softRowLabels = [
    "A,10",
    "A,9",
    "A,8",
    "A,7",
    "A,6",
    "A,5",
    "A,4",
    "A,3",
    "A,2",
    "A,A",
  ];
  const splitRowLabels = [
    "A,A",
    "X,X",
    "9,9",
    "8,8",
    "7,7",
    "6,6",
    "5,5",
    "4,4",
    "3,3",
    "2,2",
  ];
  const surrenderRowLabels = [
    "21",
    "20",
    "19",
    "18",
    "17",
    "16",
    "15",
    "14",
    "13",
    "12",
    "11",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "A,A",
    "X,X",
    "9,9",
    "8,8",
    "7,7",
    "6,6",
    "5,5",
    "4,4",
    "3,3",
    "2,2",
  ];
  return (
    <div className="strategy-table">
      <div className="strategy-table-row">
        <StrategyCell type="Hard" value={-100} />
        {columnLabels.map((x, index) => (
          <StrategyCell key={index} type={x} value={-100} />
        ))}
      </div>
      {hardRowLabels.map((rowLabel, rowIndex) => (
        <div key={rowIndex} className="strategy-table-row">
          <StrategyCell
            type={rowLabel}
            value={-100}
            key={"label-" + rowIndex}
          />
          {columnLabels.map((_, colIndex) => (
            <StrategyCell
              key={colIndex}
              type="hard"
              value={hardMatrix[rowIndex][colIndex]}
              row={rowIndex}
              col={colIndex}
              onChange={(row, col, newValue) => {
                const updated = hardMatrix.map((r, i) =>
                  r.map((v, j) => (i === row && j === col ? newValue : v))
                );
                onChange({ hardMatrix: updated });
              }}
            />
          ))}
        </div>
      ))}
      <div className="strategy-table-row">
        <StrategyCell type="Soft" value={-100} />
        {columnLabels.map((x, index) => (
          <StrategyCell key={index} type={x} value={-100} />
        ))}
      </div>
      {softRowLabels.map((rowLabel, rowIndex) => (
        <div key={rowIndex} className="strategy-table-row">
          <StrategyCell
            type={rowLabel}
            value={-100}
            key={"label-" + rowIndex}
          />
          {columnLabels.map((_, colIndex) => (
            <StrategyCell
              key={colIndex}
              type="soft"
              value={softMatrix[rowIndex][colIndex]}
              row={rowIndex}
              col={colIndex}
              onChange={(row, col, newValue) => {
                const updated = softMatrix.map((r, i) =>
                  r.map((v, j) => (i === row && j === col ? newValue : v))
                );
                onChange({ softMatrix: updated });
              }}
            />
          ))}
        </div>
      ))}

      <div className="strategy-table-row">
        <StrategyCell type="Split" value={-100} />
        {columnLabels.map((x, index) => (
          <StrategyCell key={index} type={x} value={-100} />
        ))}
      </div>
      {splitRowLabels.map((rowLabel, rowIndex) => (
        <div key={rowIndex} className="strategy-table-row">
          <StrategyCell
            type={rowLabel}
            value={-100}
            key={"label-" + rowIndex}
          />
          {columnLabels.map((_, colIndex) => (
            <StrategyCell
              key={colIndex}
              type="split"
              value={splitMatrix[rowIndex][colIndex]}
              row={rowIndex}
              col={colIndex}
              onChange={(row, col, newValue) => {
                const updated = splitMatrix.map((r, i) =>
                  r.map((v, j) => (i === row && j === col ? newValue : v))
                );
                onChange({ splitMatrix: updated });
              }}
            />
          ))}
        </div>
      ))}

      <div className="strategy-table-row">
        <StrategyCell type="Surr." value={-100} />
        {columnLabels.map((x, index) => (
          <StrategyCell key={index} type={x} value={-100} />
        ))}
      </div>
      {surrenderRowLabels.map((rowLabel, rowIndex) => (
        <div key={rowIndex} className="strategy-table-row">
          <StrategyCell
            type={rowLabel}
            value={-100}
            key={"label-" + rowIndex}
          />
          {columnLabels.map((_, colIndex) => (
            <StrategyCell
              key={colIndex}
              type="surrender"
              value={surrenderMatrix[rowIndex][colIndex]}
              row={rowIndex}
              col={colIndex}
              onChange={(row, col, newValue) => {
                const updated = surrenderMatrix.map((r, i) =>
                  r.map((v, j) => (i === row && j === col ? newValue : v))
                );
                onChange({ surrenderMatrix: updated });
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default StrategyTable;
