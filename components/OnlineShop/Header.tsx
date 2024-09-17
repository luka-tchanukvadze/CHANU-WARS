import Nav from "./Nav";
import useCart from "@/hooks/useCart";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();

  const content = (
    <header className="bg-gray-900 text-white p-4 sticky top-0 z-10 border-b border-gray-700">
      <div className="flex justify-between items-center">
        <h1 className="text-yellow-400 font-extrabold">CHANU SHOP</h1>
        <div className="text-right">
          <p>Total items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );

  return content;
};
export default Header;
