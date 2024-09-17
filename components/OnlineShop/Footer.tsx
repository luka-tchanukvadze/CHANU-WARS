import useCart from "@/hooks/useCart";

type PropsType = {
  viewCart: boolean;
};

const Footer = ({ viewCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();
  const year: number = new Date().getFullYear();

  const pageContent = viewCart ? (
    <p className="text-gray-300">Shopping Cart &copy; {year}</p>
  ) : (
    <div className=" text-gray-300">
      <p>Total Items: {totalItems}</p>
      <p>Total Price: {totalPrice}</p>
      <p>Shopping Cart &copy; {year}</p>
    </div>
  );

  const content = (
    <footer className="flex-grow flex flex-col justify-end p-4 bg-gray-900">
      {pageContent}
    </footer>
  );

  return content;
};
export default Footer;
