import cx from "classnames";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ANIMATION_TIME } from "utils/consts";
import { CircleStyle, CounterViewStyle, OverlayStyle } from "./styles";

export type Props = {
  color?: string;
  index?: number;
  width?: number;
  height?: number;
  negative?: boolean;
  className?: string;
  borderWidth?: number;
  currentTime?: number;
  animationTime?: number;
  onRefresh?: () => void;
};

const CounterView = ({
  color = "#0e0551",
  index = 0,
  width = 40,
  height = 40,
  negative,
  className,
  borderWidth = 3,
  currentTime = ANIMATION_TIME,
  animationTime = ANIMATION_TIME,
  onRefresh = () => {},
}: Props) => {
  const [timeLoss, setTimeLoss] = useState(animationTime - currentTime);

  useEffect(() => {
    setTimeLoss(animationTime - currentTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

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
        negative={negative}
        timeLoss={timeLoss}
        borderWidth={borderWidth}
        animationTime={animationTime}
      />
      <OverlayStyle
        color={color}
        negative={negative}
        timeLoss={timeLoss}
        borderWidth={borderWidth}
        animationTime={animationTime}
      ></OverlayStyle>
    </CounterViewStyle>
  );
};

export default observer(CounterView);
