import { Link } from "react-router-dom";
import cartImg from "./shopping_cart_icon.svg";

const NavBar = (props) => {
  return (
    <>
      <nav className="navbar justify-content-between sticky-top navbar-dark bg-dark mb-2 ps-4 pe-4">
        <Link to="/" className="navbar-brand">
          TeeRex Store
        </Link>
        <div>
          <Link to="/" className="navbar-brand border-bottom">
            Products
          </Link>
          <Link to="/cart" className="position-relative" aria-current="page">
            <img src={cartImg} alt="cart" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-info">
              {props.cartItem.length}
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
