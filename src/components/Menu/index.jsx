import { Link } from "react-router-dom";
import './Menu.css';

export const Menu = () => {
  return (
    <nav id="main-menu">
      <Link to="/">Home</Link>
      <Link to="/abc">Abc</Link>
    </nav>
  );
}
