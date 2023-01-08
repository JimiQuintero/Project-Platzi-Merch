import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
import "./Header.css";

function Header() {
  const { state } = useContext(AppContext);
  const { cart } = state;

  return (
    <div className="header">
      <h1 className="header-title">
        <Link to={"/"}>PlatziConf Merch</Link>
      </h1>
      <div className="header-checkout">
        <Link to={"/checkout"}>
          <FontAwesomeIcon icon={faBasketShopping} />
          {/* <ion-icon name="basket-outline" size="large"></ion-icon> */}
        </Link>
        {cart.length > 0 && <div className="Header-alert">{cart.length}</div>}
      </div>
    </div>
  );
}

export default Header;
