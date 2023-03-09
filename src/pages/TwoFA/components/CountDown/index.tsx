import { useState, useEffect, useRef } from "react";
import cx from "classnames";
import { CircleStyle, CountDownStyle, OverlayStyle } from "./styles";

export type Props = {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  borderWidth?: number;
  animationTime: number;
  currentTime: number;
  onEnd?: () => void;
};

const CountDown = ({
  color = "#0e0551",
  width = 40,
  height = 40,
  className,
  borderWidth = 3,
  currentTime = 0,
  animationTime = 60,
  onEnd = () => {},
}: Props) => {
  const intervalRef = useRef<any>(null);
  const [count, setCount] = useState(currentTime);
  const [timeLoss, setTimeLoss] = useState(animationTime - currentTime);

  const decrement = () => {
    setCount((numb) => numb - 1);
  };

  useEffect(() => {
    if (count <= 0) {
      setCount(animationTime);
      setTimeLoss(0);
      onEnd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    intervalRef.current = setInterval(decrement, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <CountDownStyle
      width={width}
      height={height}
      className={cx([
        "bg-white -rotate-45 translate-y-1 rounded-full",
        className,
      ])}
    >
      <span className="absolute font-bold inset-0 rotate-45 flex items-center justify-center text-sm">
        {count}
      </span>
      <CircleStyle
        color={color}
        width={width}
        height={height}
        timeLoss={timeLoss}
        borderWidth={borderWidth}
        animationTime={animationTime}
      />
      <OverlayStyle
        timeLoss={timeLoss}
        borderWidth={borderWidth}
        animationTime={animationTime}
      ></OverlayStyle>
    </CountDownStyle>
  );
};

export default CountDown;
