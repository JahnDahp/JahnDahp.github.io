import { useState } from "react";
import Navbar from "../HomeComponents/Navbar";
import {
  CountingSettingsObject,
  GameSettingsObject,
  StrategySettingsObject,
} from "../SettingsObjects";
import { BlackjackGame } from "./Blackjack";
import Button from "./Button";
import Discard from "./Discard";
import "../GameStyles/Game.css";

interface Props {
  gameSettingsObject: GameSettingsObject;
  strategySettingsObject: StrategySettingsObject;
  countingSettingsObject: CountingSettingsObject;
  blackjackGame: BlackjackGame | null;
  showStrategyErrorMessage: boolean;
  showDeviationErrorMessage: boolean;
  correctChoice: number;
  updateCounter: boolean;
}

const MainScreen = ({
  gameSettingsObject,
  strategySettingsObject,
  countingSettingsObject,
  blackjackGame,
  showStrategyErrorMessage,
  showDeviationErrorMessage,
  correctChoice,
}: Props) => {
  const choiceMap: Map<number, string> = new Map([
    [BlackjackGame.HIT, "Hit"],
    [BlackjackGame.STAND, "Stand"],
    [BlackjackGame.DOUBLE, "Double"],
    [BlackjackGame.SPLIT, "Split"],
    [BlackjackGame.SURRENDER, "Surrender"],
  ]);

  const [showCounts, setShowCounts] = useState(false);

  function getCardsLeft() {
    let cardsLeft = blackjackGame?.shoe.size();
    if (cardsLeft == undefined) return 0;
    if (!blackjackGame?.handOver && !countingSettingsObject.countTableCards) {
      let cardsOnTable = 0;
      blackjackGame?.hands.map((hand) => (cardsOnTable += hand.cards.length));
      cardsOnTable += 2;
      cardsLeft += cardsOnTable;
    }
    return cardsLeft;
  }

  function getTrue() {
    const RC = blackjackGame?.getRunningCount() ?? 0;
    const cardsLeft = getCardsLeft();
    let divisor = 1;
    let TC = 0;
    switch (countingSettingsObject.divisor) {
      case "Quarter deck":
        divisor = 0.25;
        break;
      case "Half deck":
        divisor = 0.5;
        break;
      default:
        divisor = 1;
        break;
    }
    TC = Math.round(RC / (cardsLeft / BlackjackGame.DECK_SIZE) / divisor);
    switch (countingSettingsObject.calculation) {
      case "Floor":
        TC = Math.floor(TC);
        break;
      case "Truncate":
        TC = Math.trunc(TC);
        break;
      default:
        TC = Math.round(TC);
        break;
    }
    return TC;
  }

  return (
    <>
      <Navbar />
      <Discard
        total={150}
        current={
          150 *
          ((gameSettingsObject.decks * BlackjackGame.DECK_SIZE -
            getCardsLeft()) /
            (gameSettingsObject.decks * BlackjackGame.DECK_SIZE))
        }
      />
      {strategySettingsObject.showErrors && showStrategyErrorMessage && (
        <h1 className="game-error-label">{`Strategy error! Correct choice: ${choiceMap.get(
          correctChoice
        )}`}</h1>
      )}
      {strategySettingsObject.showErrors && showDeviationErrorMessage && (
        <h1 className="game-error-label">{`Deviation error! Correct choice: ${choiceMap.get(
          correctChoice
        )}`}</h1>
      )}
      <h1 className="game-bankroll-label">{`Bankroll: ${blackjackGame?.bankroll}`}</h1>
      {blackjackGame?.handOver && (
        <h1 className="game-gain-label">{`${blackjackGame.lastGain}`}</h1>
      )}
      <div className="game-counts-button">
        <Button
          name="Show Count"
          onClick={() => {
            setShowCounts((prev) => !prev);
          }}
          width="120px"
        />
      </div>
      {showCounts && (
        <div>
          <h1 className="game-running-count-label">{`Running count: ${blackjackGame?.getRunningCount()}`}</h1>
          {countingSettingsObject.divisor !== "No true count" && (
            <h1 className="game-true-count-label">{`True count: ${getTrue()}`}</h1>
          )}
        </div>
      )}
    </>
  );
};

export default MainScreen;
