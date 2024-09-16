import Nav from "./Nav";
import useCart from "@/hooks/useCart";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();

  const content = (
    <header className="header bg-header">
      <div className="header__title-bar">
        <h1 className="text-yellow-500 font-extrabold">CHANU SHOP</h1>
        <div className="header__price-box">
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
