import { useEffect, useRef, useState } from "react";
import "../PlayStyles/Dropdown.css";

interface Props {
  list: string[];
  initial: string;
  onSelect?: (value: string) => void;
}

const Dropdown = ({ list, initial, onSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(initial);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(initial);
  }, [initial]);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  const handleSelect = (item: string) => {
    setSelected(item);
    setOpen(false);
    onSelect?.(item);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredList = list.filter((item) => item !== selected);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className={`dropdown-button ${open ? "selected" : ""}`}
        onClick={toggleDropdown}
      >
        <span className="dropdown-button-text">{selected}</span>
        <span className="dropdown-button-arrow">▾</span>
      </button>
      {open && (
        <div className="dropdown-content">
          {filteredList.map((item, index) => (
            <a
              key={index}
              onClick={() => handleSelect(item)}
              style={{ cursor: "pointer" }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
