"use client";
import Cart from "@/components/OnlineShop/Cart";
import Footer from "@/components/OnlineShop/Footer";
import Header from "@/components/OnlineShop/Header";
import ProductList from "@/components/OnlineShop/ProductList";
import { useState } from "react";

import { CartProvider } from "@/context/CartProvider";
import { ProductsProvider } from "@/context/ProductsProvider";

const page = () => {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart /> : <ProductList />;

  const content = (
    <>
      <CartProvider>
        <ProductsProvider>
          <Header viewCart={viewCart} setViewCart={setViewCart} />

          {pageContent}

          <Footer viewCart={viewCart} />
        </ProductsProvider>
      </CartProvider>
    </>
  );

  return content;
};
export default page;
