import Link from "next/link";

const HomePage = () => {
  return (
    <nav className="grid grid-cols-1 gap-10 mx-8 text-center items-center justify-center h-screen md:grid-cols-2 xl:grid-cols-3 2xl:mx-40">
      {/* Info Card */}
      <div className="relative flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-indigo-500 py-12 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
        <h2 className="text-2xl font-bold text-white mb-2">Unlock the Lore</h2>
        <p className="text-white text-opacity-80">
          Delve deep into the galaxy's most guarded secrets.
        </p>
        <Link
          href="StarWarsLore"
          className="mt-4 px-4 py-2 bg-white text-purple-600 rounded-lg shadow-md hover:bg-purple-600 hover:text-white transition-all duration-300"
        >
          Click
        </Link>
      </div>
      {/* Shop Card */}
      <div className="relative flex flex-col justify-center items-center bg-gradient-to-r from-green-500 to-teal-500 py-12 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
        <h2 className="text-2xl font-bold text-white mb-2">
          Exclusive Merchandise
        </h2>
        <p className="text-white text-opacity-80">
          Gear up with rare collectibles that scream loyalty.
        </p>
        <Link
          href="OnlineShop"
          className="mt-4 px-4 py-2 bg-white text-green-600 rounded-lg shadow-md hover:bg-green-600 hover:text-white transition-all duration-300"
        >
          Click
        </Link>
      </div>

      {/* Game Card */}
      <div className="relative flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-cyan-500 py-12 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 md:col-span-2 xl:col-span-1">
        <h2 className="text-2xl font-bold text-white mb-2">
          Space Combat Awaits
        </h2>
        <p className="text-white text-opacity-80">
          Command your starship and conquer the cosmos.
        </p>
        <Link
          href="Game"
          className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          Click
        </Link>
      </div>
    </nav>
  );
};
export default HomePage;
