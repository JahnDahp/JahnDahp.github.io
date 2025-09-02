import "../GameStyles/Discard.css";

interface Props {
  total: number;
  current: number;
}

const Discard = ({ total, current }: Props) => {
  return (
    <div
      className="discard"
      style={{
        height: `${total}px`,
      }}
    >
      <div
        className="discard-fill"
        style={{
          height: `${current}px`,
        }}
      />
    </div>
  );
};

export default Discard;
