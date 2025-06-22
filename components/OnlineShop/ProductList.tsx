"use client";
import useCart from "@/hooks/useCart";
import useProducts from "@/hooks/useProducts";
import type { ReactElement } from "react";
import Product from "./Product";

const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProducts();

  let pageContent: ReactElement | ReactElement[] = (
    <p className="text-white">Loading ... </p>
  );

  if (products?.length) {
    pageContent = products.map((product) => {
      const inCart: boolean = cart.some((item) => item.sku === product.sku);

      return (
        <Product
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  const content = (
    <main className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 sm:gap-8 lg:gap-10">
        {pageContent}
      </div>
    </main>
  );

  return content;
};

export default ProductList;
