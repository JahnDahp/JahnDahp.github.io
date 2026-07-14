import { Link } from "react-router-dom";
import "../HomeStyles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Blackjack Online</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Settings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
