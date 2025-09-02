import "../GameStyles/PlayingCard.css";

interface Props {
  rank: number;
  suit: string;
  onClick?: () => void;
}

const PlayingCard = ({ rank, suit, onClick }: Props) => {
  const isRed = suit === "hearts" || suit === "diamonds";
  const suitSymbol = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠",
  }[suit];

  const displayRank =
    rank === 11
      ? "J"
      : rank === 12
      ? "Q"
      : rank === 13
      ? "K"
      : rank === 1
      ? "A"
      : rank;

  return (
    <div className="playing-card" onClick={onClick}>
      <div
        className="playing-card-top-left"
        style={{ color: isRed ? "darkred" : "black" }}
      >
        <span>{displayRank}</span>
      </div>
      <div
        className="playing-card-center"
        style={{ color: isRed ? "darkred" : "black" }}
      >
        <span>{suitSymbol}</span>
      </div>
      <div
        className="playing-card-bottom-right"
        style={{ color: isRed ? "darkred" : "black" }}
      >
        <span>{displayRank}</span>
      </div>
    </div>
  );
};

export default PlayingCard;
