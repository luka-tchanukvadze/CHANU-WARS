import useCart from "@/hooks/useCart";

type PropsType = {
  viewCart: boolean;
};

const Footer = ({ viewCart }: PropsType) => {
  const { totalItems, totalPrice } = useCart();

  const year: number = new Date().getFullYear();

  const pageContent = viewCart ? (
    <p className="text-white">Shopping Cart copy; {year}</p>
  ) : (
    <div className="bg-footer">
      <p className="text-white">Total ITems: {totalItems}</p>
      <p className="text-white">Total Price: {totalPrice}</p>
      <p className="text-white">shopping Cart copy; {year}</p>
    </div>
  );

  const content = <footer className="footer">{pageContent}</footer>;

  return content;
};
export default Footer;
