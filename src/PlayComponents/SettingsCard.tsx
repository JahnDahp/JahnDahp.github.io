import { ReactNode } from "react";
import "../PlayStyles/SettingsCard.css";

interface Props {
  headers: string[];
  selectedHeader: number;
  setSelectedHeader: (index: number) => void;
  playButton?: ReactNode;
}

const SettingsCard = ({
  selectedHeader,
  setSelectedHeader,
  headers,
  playButton,
}: Props) => {
  return (
    <div className="settings-card">
      {headers.map((title, index) => (
        <h1
          key={index}
          className={`settings-card-title ${
            selectedHeader === index ? "selected" : ""
          }`}
          onClick={() => {
            setSelectedHeader(index);
          }}
        >
          {title}
        </h1>
      ))}
      {playButton}
    </div>
  );
};

export default SettingsCard;
