import { ChangeEvent, ReactElement, memo } from "react";
import { CartItemType } from "@/context/CartProvider";
import { ReducerAction } from "@/context/CartProvider";
import { ReducerActionType } from "@/context/CartProvider";
import Image from "next/image";
import { motion } from "framer-motion";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};

const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
  const img: string = new URL(`@/public/${item.sku}.jpg`, import.meta.url).href;

  const lineTotal: number = item.qty * item.price;

  const highestQty: number = 20 > item.qty ? 20 : item.qty;

  const optionValues: number[] = Array.from(
    { length: highestQty },
    (_, i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl shadow-lg mb-4 border border-yellow-500/30"
    >
      <div className="flex items-center mb-4 sm:mb-0 sm:gap-8 gap-2">
        <div>
          <Image
            width={80}
            height={80}
            src={item.sku}
            alt={item.name}
            className="rounded-lg shadow-md border-2 border-blue-500/50 mr-4"
          />
        </div>
        <div>
          <h3 className="text-yellow-400 font-bold text-lg mb-1">
            {item.name}
          </h3>
          <p className="text-blue-300 text-sm">
            Price: <span className="text-cyan-400">{item.price} credits</span>
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor={`itemQty-${item.sku}`} className="sr-only">
          Item Quantity
        </label>
        <select
          name={`itemQty-${item.sku}`}
          id={`itemQty-${item.sku}`}
          className="bg-gray-700 text-white rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={item.qty}
          onChange={onChangeQty}
        >
          {options}
        </select>

        <p className="text-yellow-300 text-sm sm:text-base">
          Total:{" "}
          <span className="text-yellow-400 font-bold">{lineTotal} credits</span>
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={onRemoveFromCart}
          aria-label={`Remove ${item.name} from cart`}
        >
          X
        </motion.button>
      </div>
    </motion.li>
  );
};

function areItemsEqual(
  { item: prevItem }: PropsType,
  { item: nextItem }: PropsType
) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
  CartLineItem,
  areItemsEqual
);

export default MemoizedCartLineItem;
