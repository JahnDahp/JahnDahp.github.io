import { useEffect, useState } from "react";
import "../PlayStyles/CountingCell.css";

interface Props {
  type: string;
  value: number;
  row?: number;
  col?: number;
  onChange?: (row: number, col: number, newValue: number) => void;
  onBlur?: () => void;
}

const CountingCell = ({ type, value, row, col, onChange, onBlur }: Props) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (value === -101) {
      setInputValue(type);
    } else if (value === -100) {
      setInputValue("");
    } else {
      setInputValue(String(value));
    }
  }, [value, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const regex = /^-?\d*$/;

    if (regex.test(input)) {
      setInputValue(input);
    }
  };

  const handleBlur = () => {
    let parsed =
      inputValue === "" || inputValue === "-" || isNaN(Number(inputValue))
        ? -100
        : parseInt(inputValue);
    if (parsed !== -100 && parsed !== -101) {
      parsed = Math.max(-99, Math.min(99, parsed));
    }
    if (onChange && row !== undefined && col !== undefined) {
      onChange(row, col, parsed);
    }
    if (parsed === -100) {
      setInputValue("");
    } else if (parsed === -101) {
      setInputValue(type);
    } else {
      setInputValue(String(parsed));
    }
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <input
      className="counting-cell"
      type="text"
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      style={{
        backgroundColor: inputValue === "" ? "darkgoldenrod" : "red",
        color: "white",
        textAlign: "center",
      }}
    />
  );
};

export default CountingCell;
