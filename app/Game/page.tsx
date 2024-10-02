import GameContainer from "@/components/Game/GameContainer";
import Link from "next/link";

const page = () => {
  return (
    <>
      {/* <GameContainer /> */}
      <Link
        href="/"
        className="absolute text-yellow-500 font-extrabold left-0 top-0"
      >
        Go Home
      </Link>
      <div className="absolute text-white left-0 top-6">
        click on the screen to start playing
      </div>
      <div className="absolute text-white left-0 top-12">
        use: w,a,s,d to move
      </div>
      <div className="absolute text-white left-0 top-16">
        use: space to shoot
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
