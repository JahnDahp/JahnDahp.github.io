import { Link } from "react-router-dom";
import "../HomeStyles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Blackjack Online</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/play-settings">Play</Link>
        </li>
        <li>
          <Link to="/calculator">Calculate</Link>
        </li>
        <li>
          <Link to="/sim">Simulate</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
