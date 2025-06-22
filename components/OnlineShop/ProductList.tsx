"use client";
import useCart from "@/hooks/useCart";
import useProducts from "@/hooks/useProducts";
import type { ReactElement } from "react";
import { useState, useMemo } from "react";
import { Star, Zap, ShoppingCart } from "lucide-react";
import Product from "./Product";
import Pagination from "./Pagination";

const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  const { products } = useProducts();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // You can make this configurable

  // Calculate pagination values
  const totalItems = products?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page products
  const currentProducts = useMemo(() => {
    if (!products?.length) return [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let pageContent: ReactElement | ReactElement[] = (
    <div className="col-span-full flex flex-col justify-center items-center py-16">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="h-8 w-8 text-yellow-500 animate-pulse" />
        <p className="text-yellow-400 text-xl font-mono">
          Scanning the galaxy for artifacts...
        </p>
        <Zap className="h-8 w-8 text-yellow-500 animate-pulse" />
      </div>
      <p className="text-gray-500 text-sm font-mono italic">
        The Force is strong with this loading...
      </p>
    </div>
  );

  if (products?.length === 0) {
    pageContent = (
      <div className="col-span-full flex flex-col justify-center items-center py-16">
        <div className="flex items-center gap-3 mb-4">
          <Star className="h-8 w-8 text-red-500" />
          <p className="text-red-400 text-xl font-mono">
            No artifacts found in this sector.
          </p>
          <Star className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-gray-500 text-sm font-mono italic">
          "These are not the droids you're looking for..."
        </p>
      </div>
    );
  } else if (currentProducts.length > 0) {
    pageContent = currentProducts.map((product) => {
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
      {/* Epic Star Wars Title - Removed background shadows */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          {/* <Star className="h-8 w-8 text-yellow-500" /> */}
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-mono tracking-wider">
            GALACTIC MARKETPLACE
          </h1>
          {/* <Star className="h-8 w-8 text-yellow-500" /> */}
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-32"></div>
          <ShoppingCart className="h-5 w-5 text-yellow-400" />
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-32"></div>
        </div>

        <p className="text-yellow-400/80 text-lg font-mono italic">
          "Your one-stop cantina for rare artifacts across the galaxy"
        </p>
        <p className="text-gray-500 text-sm font-mono mt-2">
          Est. 0 BBY • Serving rebels, smugglers, and Jedi since the fall of the
          Empire
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-8">
        {pageContent}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      )}
    </main>
  );

  return content;
};

export default ProductList;
