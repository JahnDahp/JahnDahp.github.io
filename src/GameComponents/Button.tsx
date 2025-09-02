import "../GameStyles/Button.css";

interface ButtonProps {
  name: string;
  onClick: () => void;
  width: string;
}

const Button = ({ name, onClick, width }: ButtonProps) => {
  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
  };

  return (
    <button
      className="game-button"
      onMouseUp={handleMouseUp}
      onClick={onClick}
      style={{ width: `${width}` }}
    >
      {name}
    </button>
  );
};

export default Button;
