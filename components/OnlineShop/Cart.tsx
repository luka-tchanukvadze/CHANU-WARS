"use client";
import useCart from "@/hooks/useCart";
import { useState } from "react";
import CartlineItem from "./CartlineItem";

const Cart = () => {
  const [confirm, setConfirm] = useState(false);
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <h2>Thank for your order.</h2>
  ) : (
    <div className="text-white">
      <h2 className="offscreen">Cart</h2>
      <ul className="cart">
        {cart.map((item) => {
          return (
            <CartlineItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          );
        })}
      </ul>
      <div className="cart_totals">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <button
          className="cart_submit"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place order
        </button>
      </div>
    </div>
  );

  const content = <main className="main main--cart">{pageContent}</main>;

  return content;
};
export default Cart;
