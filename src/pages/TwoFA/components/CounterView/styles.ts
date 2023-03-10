import styled, { keyframes } from "styled-components";

type KeyframesType = {
  color?: string;
  timeLoss: number;
  animationTime: number;
};

const rotateCircleBefore = ({
  color,
  timeLoss,
  animationTime,
}: KeyframesType) => {
  const getBR = (percent: number) => {
    return `border-right-color: ${
      timeLoss / animationTime >= percent ? color : "transparent"
    };`;
  };
  const getBB = (percent: number) => {
    return `border-bottom-color: ${
      timeLoss / animationTime >= percent ? color : "transparent"
    };`;
  };
  const getBL = (percent: number) => {
    return `border-left-color: ${
      timeLoss / animationTime >= percent ? color : "transparent"
    };`;
  };
  const br = (
    ((animationTime / 4 - timeLoss) * 100) /
    (animationTime - timeLoss)
  ).toFixed(2);
  const bb = (
    ((animationTime / 2 - timeLoss) * 100) /
    (animationTime - timeLoss)
  ).toFixed(2);
  const bl = (
    (((animationTime * 3) / 4 - timeLoss) * 100) /
    (animationTime - timeLoss)
  ).toFixed(2);

  return keyframes`
  0% {
    ${getBR(0.25)}
    ${getBB(0.5)}
    ${getBL(0.75)}
  }
  ${Number(br) - 0.01 + "%"} {
    border-right-color: transparent;
  }
  ${br + "%"} {
    border-right-color: ${color};
  }
  ${Number(bb) - 0.01 + "%"} {
    border-bottom-color: transparent;
  }
  ${bb + "%"} {
    border-bottom-color: ${color};
  }
  ${Number(bl) - 0.01 + "%"} {
    border-left-color: transparent;
  }
  ${bl + "%"} {
    border-left-color: ${color};
  }
  100% {
    border-right-color: ${color};
    border-bottom-color: ${color};
    border-left-color: ${color}
  }
  `;
};

const rotateCircleAfter = ({
  timeLoss,
  animationTime,
}: KeyframesType) => keyframes`
0% {
  transform: rotate(${(360 * timeLoss) / animationTime}deg);
}
100% {
  transform: rotate(360deg);
}
`;

const rotateOverlay = ({ timeLoss, animationTime }: KeyframesType) => {
  const milestones = (animationTime * 3) / 4 - timeLoss;
  const bt = (
    ((milestones > 0 ? milestones : 0) * 100) /
    (animationTime - timeLoss)
  ).toFixed(2);
  return keyframes`
  0% {
    border-top-color: #ffffff;
  }
  ${Number(bt) - 0.01 + "%"} {
    border-top-color: #ffffff;
  }
  ${bt + "%"} {
    border-top-color: transparent;
  }
  99.99%{
    border-top-color: transparent;
  }
  100% {
    border-top-color: #ffffff;
  }
  `;
};

type CounterViewStyleType = {
  width: number;
  height: number;
};

export const CounterViewStyle = styled("div")<CounterViewStyleType>(
  ({ width = 50, height = 50 }) => ({
    width,
    height,
  })
);

type OverlayStyleType = {
  timeLoss: number;
  animationTime: number;
  borderWidth: number;
};

export const OverlayStyle = styled.div<OverlayStyleType>`
  position: absolute;
  inset: -1px;
  border-radius: 100%;
  border: ${(props) => (props.borderWidth || 3) + 2}px solid transparent;
  animation-name: ${(props) =>
    rotateOverlay({
      timeLoss: props.timeLoss,
      animationTime: props.animationTime,
    })};
  animation-duration: ${(props) => props.animationTime - props.timeLoss}s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

type CircleStyleType = {
  width: number;
  color: string;
  height: number;
  timeLoss: number;
  borderWidth: number;
  animationTime: number;
};

export const CircleStyle = styled.div<CircleStyleType>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  border-radius: 100%;
  &::before,
  &::after {
    content: "";
    inset: 0;
    border-radius: 100%;
    position: absolute;
    border: ${(props) => props.borderWidth}px solid transparent;
    animation-duration: ${(props) => props.animationTime - props.timeLoss}s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  &::before {
    animation-name: ${(props) =>
      rotateCircleBefore({
        color: props.color,
        timeLoss: props.timeLoss,
        animationTime: props.animationTime,
      })};
  }
  &::after {
    border-top-color: ${(props) => props.color};
    animation-name: ${(props) =>
      rotateCircleAfter({
        timeLoss: props.timeLoss,
        animationTime: props.animationTime,
      })};
  }
`;
