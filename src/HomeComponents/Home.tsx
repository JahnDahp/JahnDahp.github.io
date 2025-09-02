import Header from "./Header";
import Navbar from "./Navbar";
import TitleCards from "./TitleCards";
import headerImage from "../assets/blackjack.jpg";
import "../HomeStyles/Home.css";

function Home() {
  return (
    <div>
      <Navbar />
      <Header
        title="John's Blackjack Online"
        subtitle="May your expectation be forever positive."
        image={headerImage}
      />
      <TitleCards></TitleCards>
    </div>
  );
}

export default Home;
