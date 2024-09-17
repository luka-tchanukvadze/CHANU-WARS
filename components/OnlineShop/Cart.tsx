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
    <h2 className="text-white">Thank you for your order.</h2>
  ) : (
    <div className="text-white">
      <h2 className="sr-only">Cart</h2>
      <ul className="space-y-2">
        {cart.map((item) => (
          <CartlineItem
            key={item.sku}
            item={item}
            dispatch={dispatch}
            REDUCER_ACTIONS={REDUCER_ACTIONS}
          />
        ))}
      </ul>
      <div className="space-y-2 mt-4">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded shadow-neon hover:bg-blue-600"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );

  const content = <main className="p-4">{pageContent}</main>;

  return content;
};
export default Cart;
