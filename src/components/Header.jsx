import { useContext } from "react";

import Button from "./UI/Button.jsx";
import srcLogo from "../assets/logo.jpg";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartContext = cartCtx.items.reduce((totalNumber , item) => {
    return totalNumber + item.quantity ;
  } , 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={srcLogo} alt="A resturant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Carts ({totalCartContext})</Button>
      </nav>
    </header>
  );
}
