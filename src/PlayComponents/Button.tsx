import { Link } from "react-router-dom";
import "../PlayStyles/Button.css";

interface ButtonProps {
  name: string;
  to?: string;
}

const Button = ({ name, to }: ButtonProps) => {
  if (to) {
    return (
      <Link to={to} className="button">
        {name}
      </Link>
    );
  }
  return <button className="button">{name}</button>;
};

export default Button;
