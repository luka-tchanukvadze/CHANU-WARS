import { useEffect, useRef } from "react";

const LaserUseCanvas = ({ draw }: any) => {
  const ref = useRef();

  useEffect(() => {
    const canvas: any = ref.current;
    const context = canvas.getContext("2d");
    let count = 0;
    let animationID: any;

    const renderer = () => {
      count++;
      draw(context, count);
      animationID = window.requestAnimationFrame(renderer);
    };
    renderer();

    return () => window.cancelAnimationFrame(animationID);
  }, [draw]);

  return ref;
};
export default LaserUseCanvas;
