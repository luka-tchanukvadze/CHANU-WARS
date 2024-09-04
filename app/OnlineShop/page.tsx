"use client";
import Cart from "@/components/OnlineShop/Cart";
import Footer from "@/components/OnlineShop/Footer";
import Header from "@/components/OnlineShop/Header";
import ProductList from "@/components/OnlineShop/ProductList";
import { useState } from "react";

const page = () => {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart /> : <ProductList />;

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />

      {pageContent}

      <Footer viewCart={viewCart} />
    </>
  );

  return content;
};
export default page;
