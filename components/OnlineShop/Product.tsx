import { ProductType } from "@/context/ProductsProvider";
import { ReducerActionType, ReducerAction } from "@/context/CartProvider";
import { ReactElement, memo } from "react";
import Image from "next/image";
import a from "@/public/item0001.jpg";
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

  // const img: string = new URL(`..@/public/${product.sku}.jpg`, import.meta.url)
  //   .href;

  console.log(img);

  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

  const itemInCart = inCart ? "=> item in Cart" : null;

  const content = (
    <article className="product text-white">
      <h3>{product.name}</h3>
      <Image
        width={1000}
        height={1000}
        src={a}
        alt={product.name}
        className="product_img"
      />
      <p>
        {/* {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)} */}
        {product.price}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add to Cart</button>
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
