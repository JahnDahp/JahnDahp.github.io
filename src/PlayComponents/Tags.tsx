import Dropdown from "./Dropdown";
import "../PlayStyles/Tags.css";

interface Props {
  values: number[];
  onChange: (index: number, value: number) => void;
}

const Tags = ({ values, onChange }: Props) => {
  const labels = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"];
  const options = ["-3", "-2", "-1", "0", "1", "2", "3"];

  return (
    <div className="tags">
      {labels.map((label, index) => (
        <div key={index} className="tags-pair">
          <h1 className="tags-pair-label">{label}</h1>
          <div className="tags-pair-dropdown">
            <Dropdown
              list={options}
              initial={values[index]?.toString() || "0"}
              onSelect={(val) => onChange(index, parseInt(val))}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tags;
