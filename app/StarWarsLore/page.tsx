import CircleList from "@/components/StarWarsLore/CircleList";
import StarWarsInfos from "@/components/StarWarsLore/StarWarsInfos";
import Link from "next/link";

const page = () => {
  return (
    <>
      <Link
        href="/"
        className="absolute top-4 left-4 text-yellow-400 font-extrabold"
      >
        Home
      </Link>
      <StarWarsInfos />
    </>
  );
};
export default page;
