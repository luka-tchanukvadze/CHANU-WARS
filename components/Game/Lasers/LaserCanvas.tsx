// import { useEffect, useRef } from "react";
// import LaserUseCanvas from "./LaserUseCanvas";

// const LaserCanvas = (props: any) => {
//   const { draw, ...rest } = props;
//   const ref = LaserUseCanvas({ draw });

//   return <canvas className=" h-[33rem] w-3" ref={ref} {...rest} />;
// };
// export default LaserCanvas;
import { useEffect, useRef } from "react";

const LaserCanvas = ({ draw, setLaserPosition }: any) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    let count = 0;
    let animationID: any;

    const renderer = () => {
      count++;
      const laserY = 1 + (count % 150); // Example laser position
      setLaserPosition(laserY); // Pass the laser position upwards
      context?.clearRect(0, 0, canvas.width, canvas.height);
      draw(context, count);
      animationID = window.requestAnimationFrame(renderer);
    };
    renderer();

    return () => window.cancelAnimationFrame(animationID);
  }, [draw, setLaserPosition]);

  return <canvas className="h-[33rem] w-3" ref={ref} />;
};

export default LaserCanvas;
