import { ProductType } from "@/context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "@/context/CartProvider";
import { ReactElement, memo } from "react";
import Image from "next/image";

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: PropsType): ReactElement => {
  const img: string = `@/public/${product.sku}.jpg`;

  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

  const itemInCart = inCart ? "=> item in Cart" : null;

  const content = (
    <article className="bg-gradient-to-r from-green-500 to-teal-500 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg flex flex-col justify-center items-center text-center">
      <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-2 text-yellow-300">
        {product.name}
      </h3>
      <Image
        width={1000}
        height={1000}
        src={product.sku}
        alt={product.name}
        className="w-40 h-40 sm:w-48 sm:h-48 lg:w-60 lg:h-60 object-fill rounded"
      />
      <p className="text-sm sm:text-base lg:text-lg mt-2 text-gray-300">
        type: {product.type}
      </p>
      <p className="text-sm sm:text-base lg:text-lg mb-2 text-gray-200">
        {product.description}
      </p>
      <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-yellow-400">
        {product.price} credits {itemInCart}
      </p>
      <button
        onClick={onAddToCart}
        className="mt-4 px-4 py-2 bg-white text-green-600 rounded-lg shadow-md hover:bg-green-600 hover:text-white transition-all duration-300"
      >
        Add to Cart
      </button>
    </article>
  );

  return content;
};

function areProductsEqual(
  { product: PrevProduct, inCart: prevInCart }: PropsType,
  { product: nextProduct, inCart: nextInCart }: PropsType
) {
  return Object.keys(PrevProduct).every((key) => {
    return (
      PrevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType] && prevInCart === nextInCart
    );
  });
}
const memoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default memoizedProduct;
