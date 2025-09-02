import "../PlayStyles/CountingTable.css";
import { CountingSettingsObject } from "../SettingsObjects";
import CountingCell from "./CountingCell";
import StrategyCell from "./StrategyCell";

interface Props {
  hitStandMatrix: number[][];
  doubleMatrix: number[][];
  splitMatrix: number[][];
  surrenderMatrix: number[][];
  onChange: (updates: Partial<CountingSettingsObject>) => void;
}

const CountingTable = ({
  hitStandMatrix,
  doubleMatrix,
  splitMatrix,
  surrenderMatrix,
  onChange,
}: Props) => {
  const LABEL = -101;

  const columnLabels = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"];
  const hitStandRowLabels = [
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
  const doubleRowLabels = [
    "11",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
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

  const updateMatrix = (
    matrix: number[][],
    row: number,
    col: number,
    newValue: number
  ): number[][] =>
    matrix.map((r, i) =>
      r.map((v, j) => (i === row && j === col ? newValue : v))
    );

  return (
    <div className="counting-table">
      <div className="counting-table-row">
        <StrategyCell type="HS" value={LABEL} />
        {columnLabels.map((x, index) => (
          <StrategyCell key={index} type={x} value={LABEL} />
        ))}
      </div>
      {hitStandRowLabels.map((rowLabel, rowIndex) => (
        <div key={`HS-row-${rowIndex}`} className="counting-table-row">
          <StrategyCell
            type={rowLabel}
            value={LABEL}
            key={"label-" + rowIndex}
          />
          {columnLabels.map((_, colIndex) => (
            <CountingCell
              key={`HS-${rowIndex}-${colIndex}`}
              type="index"
              value={hitStandMatrix[rowIndex][colIndex]}
              row={rowIndex}
              col={colIndex}
              onChange={(row, col, newValue) => {
                onChange({
                  hitStandMatrix: updateMatrix(
                    hitStandMatrix,
                    row,
                    col,
                    newValue
                  ),
                });
              }}
            />
          ))}
        </div>
      ))}
      <div className="counting-table-row">
        <StrategyCell type="DD" value={LABEL} />
        {columnLabels.map((x, index) => (
          <StrategyCell key={index} type={x} value={LABEL} />
        ))}
      </div>
      {doubleRowLabels.map((rowLabel, rowIndex) => (
        <div key={`D-row-${rowIndex}`} className="counting-table-row">
          <StrategyCell
            type={rowLabel}
            value={LABEL}
            key={"label-" + rowIndex}
          />
          {columnLabels.map((_, colIndex) => (
            <CountingCell
              key={`D-${rowIndex}-${colIndex}`}
              type="index"
              value={doubleMatrix[rowIndex][colIndex]}
              row={rowIndex}
              col={colIndex}
              onChange={(row, col, newValue) => {
                onChange({
                  doubleMatrix: updateMatrix(doubleMatrix, row, col, newValue),
                });
              }}
            />
          ))}
        </div>
      ))}
      <div className="counting-table-row">
        <StrategyCell type="Split" value={LABEL} />
        {columnLabels.map((x, index) => (
          <StrategyCell key={index} type={x} value={LABEL} />
        ))}
      </div>
      {splitRowLabels.map((rowLabel, rowIndex) => (
        <div key={`split-row-${rowIndex}`} className="counting-table-row">
          <StrategyCell
            type={rowLabel}
            value={LABEL}
            key={"label-" + rowIndex}
          />
          {columnLabels.map((_, colIndex) => (
            <CountingCell
              key={`split-${rowIndex}-${colIndex}`}
              type="index"
              value={splitMatrix[rowIndex][colIndex]}
              row={rowIndex}
              col={colIndex}
              onChange={(row, col, newValue) => {
                onChange({
                  splitMatrix: updateMatrix(splitMatrix, row, col, newValue),
                });
              }}
            />
          ))}
        </div>
      ))}
      <div className="counting-table-row">
        <StrategyCell type="Surr." value={LABEL} />
        {columnLabels.map((x, index) => (
          <StrategyCell key={index} type={x} value={LABEL} />
        ))}
      </div>
      {surrenderRowLabels.map((rowLabel, rowIndex) => (
        <div key={`surr-row-${rowIndex}`} className="counting-table-row">
          <StrategyCell
            type={rowLabel}
            value={LABEL}
            key={"label-" + rowIndex}
          />
          {columnLabels.map((_, colIndex) => (
            <CountingCell
              key={`surr-${rowIndex}-${colIndex}`}
              type="index"
              value={surrenderMatrix[rowIndex][colIndex]}
              row={rowIndex}
              col={colIndex}
              onChange={(row, col, newValue) => {
                onChange({
                  surrenderMatrix: updateMatrix(
                    surrenderMatrix,
                    row,
                    col,
                    newValue
                  ),
                });
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CountingTable;
