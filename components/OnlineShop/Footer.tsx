const Footer = () => {
  const pageContent = (
    <div className="text-center">
      <p className="text-sm sm:text-base lg:text-lg text-gray-300">
        Shopping Cart &copy; 2024
      </p>
    </div>
  );

  const content = (
    <footer className="flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-950">
      {pageContent}
    </footer>
  );

  return content;
};

export default Footer;
