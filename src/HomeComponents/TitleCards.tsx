import playImage from "../assets/play.jpg";
import calculateImage from "../assets/calculate.jpg";
import simulateImage from "../assets/simulate.jpg";
import Card from "./Card";
import "../HomeStyles/TitleCards.css";

const TitleCards = () => {
  return (
    <div className="card-container">
      <Card
        route="/play-settings"
        image={playImage}
        title="Play"
        body="Practice with strategy and counting drills."
        color="mediumseagreen"
      />
      <Card
        route="/calculator"
        image={calculateImage}
        title="Calculate"
        body="Hand odds, ROR, EV, and more."
        color="grey"
      />
      <Card
        route="/sim"
        image={simulateImage}
        title="Simulate"
        body="Simulate systems and betspreads."
        color="palegoldenrod"
      />
    </div>
  );
};

export default TitleCards;
