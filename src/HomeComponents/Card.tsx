import { Link } from "react-router-dom";
import "../HomeStyles/Card.css";

interface Props {
  title: string;
  body: string;
  image: string;
  color: string;
  route: string;
}

const Card = ({ image, title, body, color, route }: Props) => {
  return (
    <Link to={route} className="card" style={{ backgroundColor: color }}>
      <img className="card-image" src={image} alt={title} />
      <h1 className="card-title">{title}</h1>
      <p className="card-body">{body}</p>
    </Link>
  );
};

export default Card;
