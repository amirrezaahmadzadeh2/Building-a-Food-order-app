import { useContext } from "react";

import Button from "./UI/Button.jsx";
import Input from "./UI/Input.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/Formatter.js";

export default function () {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handelCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());


    fetch("http://localhost:3000/orders" , {
      method : "POST" ,
      headers : {
        "Content-Type" : "application/json" ,
      },
      body : JSON.stringify({
        order : {
          items : cartCtx.items ,
          customer : customerData ,
        }
      })
    });

  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handelCloseCheckout}>
      <form action="" onSubmit={handleSubmit}>
        <h2>CheckOut</h2>
        <p>Total Price : {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handelCloseCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
