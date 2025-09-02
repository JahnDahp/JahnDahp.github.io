import { useState } from "react";
import Navbar from "../HomeComponents/Navbar";
import "../PlayStyles/Play.css";
import SettingsCard from "./SettingsCard";
import GameSettings from "./GameSettings";
import BankrollSettings from "./BankrollSettings";
import StrategySettings from "./StrategySettings";
import CountingSettings from "./CountingSettings";
import {
  BankrollSettingsObject,
  CountingSettingsObject,
  GameSettingsObject,
  StrategySettingsObject,
} from "../SettingsObjects";
import Button from "./Button";

interface Props {
  gameSettingsObject: GameSettingsObject;
  setGameSettingsObject: React.Dispatch<
    React.SetStateAction<GameSettingsObject>
  >;
  bankrollSettingsObject: BankrollSettingsObject;
  setBankrollSettingsObject: React.Dispatch<
    React.SetStateAction<BankrollSettingsObject>
  >;
  strategySettingsObject: StrategySettingsObject;
  setStrategySettingsObject: React.Dispatch<
    React.SetStateAction<StrategySettingsObject>
  >;
  countingSettingsObject: CountingSettingsObject;
  setCountingSettingsObject: React.Dispatch<
    React.SetStateAction<CountingSettingsObject>
  >;
}

function Play({
  gameSettingsObject,
  setGameSettingsObject,
  bankrollSettingsObject,
  setBankrollSettingsObject,
  strategySettingsObject,
  setStrategySettingsObject,
  countingSettingsObject,
  setCountingSettingsObject,
}: Props) {
  const [selectedHeader, setSelectedHeader] = useState(0);

  const headers = ["Game Rules", "Bankroll", "Strategy", "Counting"];

  const gameSettings = [
    {
      label: "Number of decks",
      options: ["1 deck", "2 decks", "4 decks", "6 decks", "8 decks"],
    },
    {
      label: "Dealer action on soft 17",
      options: ["Stay soft 17", "Hit soft 17"],
    },
    { label: "Player may double after splitting", options: ["Yes", "No"] },
    {
      label: "Player may double on",
      options: ["8, 9, 10, 11", "9, 10, 11", "10, 11", "Any total"],
    },
    {
      label: "Player can split to",
      options: ["0 hands", "2 hands", "4 hands", "6 hands", "8 hands"],
    },
    { label: "Late surrender allowed", options: ["Yes", "No"] },
    { label: "Blackjack pays", options: ["3:2", "6:5", "2:1", "1:1"] },
    { label: "Player can resplit aces", options: ["Yes", "No"] },
    { label: "Player can draw on split aces", options: ["Yes", "No"] },
    {
      label: "Cards left after cut card",
      options: ["52"],
    },
  ];
  const bankrollSettings = [
    {
      label: "Bankroll",
      options: ["10000"],
    },
    {
      label: "Table minimum",
      options: ["25"],
    },
    {
      label: "Table maximum",
      options: ["1000"],
    },
  ];
  const strategySettings = [
    {
      label: "Show strategy errors",
      options: ["Yes", "No"],
    },
    {
      label: "Strategy Table",
      options: [],
    },
  ];
  const strategyButtonTypes = ["dropdown", "table"];
  const countingSettings = [
    {
      label: "Card Tags",
      options: [""],
    },
    {
      label: "Initial Running Count",
      options: ["1 Deck", "2 Deck", "4 Deck", "6 Deck", "8 Deck"],
    },
    {
      label: "True count divisor",
      options: ["Full deck", "Half deck", "Quarter deck", "No true count"],
    },
    {
      label: "True count calculation",
      options: ["Round", "Truncate", "Floor"],
    },
    {
      label: "Count cards on table as in discard",
      options: ["Yes", "No"],
    },
    {
      label: "Counting Table",
      options: [],
    },
  ];
  const countingButtonTypes = [
    "tags",
    "IRC",
    "dropdown",
    "dropdown",
    "dropdown",
    "ctable",
  ];

  const renderContent = () => {
    switch (selectedHeader) {
      case 0:
        return (
          <GameSettings
            gameSettings={gameSettings}
            gameSettingValues={gameSettingsObject}
            gameUpdateSetting={(updates) =>
              setGameSettingsObject((prev) => ({ ...prev, ...updates }))
            }
          />
        );
      case 1:
        return (
          <BankrollSettings
            bankrollSettings={bankrollSettings}
            bankrollSettingValues={bankrollSettingsObject}
            bankrollUpdateSetting={(updates) =>
              setBankrollSettingsObject((prev) => ({ ...prev, ...updates }))
            }
          />
        );
      case 2:
        return (
          <StrategySettings
            strategySettings={strategySettings}
            buttonTypes={strategyButtonTypes}
            strategySettingValues={strategySettingsObject}
            strategyUpdateSetting={(updates) =>
              setStrategySettingsObject((prev) => ({ ...prev, ...updates }))
            }
          />
        );
      case 3:
        return (
          <CountingSettings
            countingSettings={countingSettings}
            buttonTypes={countingButtonTypes}
            countingSettingValues={countingSettingsObject}
            countingUpdateSetting={(updates) =>
              setCountingSettingsObject((prev) => ({ ...prev, ...updates }))
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="play">
      <Navbar />
      <div className="play-content">
        <div className="play-settings-card">
          <SettingsCard
            headers={headers}
            selectedHeader={selectedHeader}
            setSelectedHeader={setSelectedHeader}
            playButton={
              <div className="settings-card-button">
                <Button name="Play" to="/game" />
              </div>
            }
          />
        </div>
        <div className="play-settings-body">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Play;
