import "../CalculatorStyles/OddTableCell.css";

interface Props {
  value: string;
}

const OddTableCell = ({ value }: Props) => {
  return <div className="odd-cell">{value}</div>;
};

export default OddTableCell;
