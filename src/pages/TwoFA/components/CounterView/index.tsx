import { useState, useEffect } from "react";
import cx from "classnames";
import { CircleStyle, CounterViewStyle, OverlayStyle } from "./styles";
import { observer } from "mobx-react-lite";

export type Props = {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  borderWidth?: number;
  animationTime: number;
  currentTime: number;
  onRefresh?: () => void;
};

const CounterView = ({
  color = "#0e0551",
  width = 40,
  height = 40,
  className,
  borderWidth = 3,
  currentTime = 0,
  animationTime = 60,
  onRefresh = () => {},
}: Props) => {
  const [timeLoss, setTimeLoss] = useState(animationTime - currentTime);

  useEffect(() => {
    if (currentTime === animationTime) {
      setTimeLoss(0);
      onRefresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  return (
    <CounterViewStyle
      width={width}
      height={height}
      className={cx([
        "bg-white -rotate-45 translate-y-1 rounded-full",
        className,
      ])}
    >
      <span className="absolute font-bold inset-0 rotate-45 flex items-center justify-center text-sm">
        {currentTime}
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
    </CounterViewStyle>
  );
};

export default observer(CounterView);
