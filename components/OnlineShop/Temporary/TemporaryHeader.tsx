import Link from "next/link";

const TemporaryHeader = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 px-4 sticky top-0 z-10 border-b border-yellow-500/30 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            href="/OnlineShop"
            className="text-yellow-400 font-extrabold text-lg sm:text-2xl font-starwars tracking-wider hover:text-yellow-300 transition-colors duration-300 text-center"
          >
            CHANU SHOP
          </Link>
          <Link
            href="/"
            className="text-blue-300 font-bold text-base sm:text-xl hover:text-blue-200 transition-colors duration-300"
          >
            HOME
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TemporaryHeader;
