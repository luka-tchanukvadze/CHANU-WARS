import GameContainer from "@/components/Game/GameContainer";
import Link from "next/link";

const page = () => {
  return (
    <>
      {/* <GameContainer /> */}
      <Link
        href="/"
        className="absolute left-2 top-0 text-white font-extrabold text-lg  rounded-lg shadow-md  transition-all duration-300 hover:scale-110"
      >
        Home
      </Link>
      <div className="absolute text-white left-2 top-12">
        <div className=" text-white  ">
          click on the screen to start playing
        </div>
        <div className=" text-white ">use: w,a,s,d to move</div>
        <div className=" text-white ">use: space to shoot</div>
      </div>
      <iframe
        src="\Quick_Game2_StarWarsThing-main\Quick_Game2_StarWarsThing-main\index.html"
        // style={{ width: "100%", height: "100%", border: "none" }}
        className="h-screen w-full"
        title="Embedded HTML"
      />
    </>
  );
};
export default page;
