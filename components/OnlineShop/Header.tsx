import Link from "next/link";
import Nav from "./Nav";
import useCart from "@/hooks/useCart";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();

  const content = (
    <header className="bg-gray-950 text-white p-4 sticky top-0 z-10 border-b border-gray-700">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="text-yellow-400 font-extrabold text-xl sm:text-2xl lg:text-3xl"
        >
          CHANU SHOP
        </Link>
        <div className="text-right">
          <p className="text-gray-200">Total items: {totalItems}</p>
          <p className="text-gray-300">Total Price: {totalPrice} credits</p>
          <Nav viewCart={viewCart} setViewCart={setViewCart} />
        </div>
      </div>
    </header>
  );

  return content;
};

export default Header;
