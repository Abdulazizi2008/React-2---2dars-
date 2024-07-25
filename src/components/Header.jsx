import { NavLink } from "react-router-dom";

const Header = ({ title }) => {
  return (
    <header className="Header">
      <NavLink to="/">
        <h1>{title}</h1>
      </NavLink>
    </header>
  );
};

export default Header;
