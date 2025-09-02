import "../HomeStyles/Header.css";

interface Props {
  title: string;
  subtitle: string;
  image: string;
}

const Header = ({ title, subtitle, image }: Props) => (
  <header className="main-header">
    <div
      className="main-header-bg"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${image})`,
      }}
    />
    <h1 className="title">{title}</h1>
    <p className="subtitle">{subtitle}</p>
  </header>
);

export default Header;
