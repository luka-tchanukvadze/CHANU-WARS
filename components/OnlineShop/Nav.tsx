type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({ viewCart, setViewCart }: PropsType) => {
  const button = viewCart ? (
    <button
      className="mt-4 px-4 py-2 bg-white text-green-600 rounded-lg shadow-md hover:bg-green-600 hover:text-white transition-all duration-300"
      onClick={() => setViewCart(false)}
    >
      View Products
    </button>
  ) : (
    <button
      className="mt-4 px-4 py-2 bg-white text-green-600 rounded-lg shadow-md hover:bg-green-600 hover:text-white transition-all duration-300"
      onClick={() => setViewCart(true)}
    >
      View Cart
    </button>
  );

  const content = <nav className="nav">{button}</nav>;

  return content;
};
export default Nav;
