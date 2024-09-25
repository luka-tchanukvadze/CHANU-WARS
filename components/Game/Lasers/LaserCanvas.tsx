import { useEffect, useRef } from "react";
import LaserUseCanvas from "./LaserUseCanvas";

const LaserCanvas = (props: any) => {
  const { draw, ...rest } = props;
  const ref = LaserUseCanvas({ draw });

  return <canvas className=" h-[33rem] w-3" ref={ref} {...rest} />;
};

export default LaserCanvas;
