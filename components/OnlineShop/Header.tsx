import Link from "next/link";
import Nav from "./Nav";
import useCart from "@/hooks/useCart";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 px-4 sticky top-0 z-10 border-b border-yellow-500/30 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-yellow-400 font-extrabold text-xl sm:text-2xl font-starwars tracking-wider hover:text-yellow-300 transition-colors duration-300"
        >
          CHANU SHOP
        </Link>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <p className="text-blue-300 text-sm">
              Items: <span className="text-cyan-400">{totalItems}</span>
            </p>
            <p className="text-yellow-300 text-sm">
              Total:{" "}
              <span className="text-yellow-400 font-bold">{totalPrice}</span>{" "}
              credits
            </p>
          </div>
          <Nav viewCart={viewCart} setViewCart={setViewCart} />
        </div>
      </div>
    </header>
  );
};

export default Header;
