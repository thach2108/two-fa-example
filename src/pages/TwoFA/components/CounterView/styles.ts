import styled, { keyframes } from "styled-components";

type KeyframesType = {
  color?: string;
  negative?: boolean;
  timeLoss: number;
  animationTime: number;
};

const borderCircle = ({
  color,
  negative,
  timeLoss,
  animationTime,
}: KeyframesType) => {
  const getBR = (percent: number) => {
    let bool = !(timeLoss / animationTime >= percent);
    if (negative) bool = !bool;
    return `border-right-color: ${bool ? color : "transparent"};`;
  };
  const getBB = (percent: number) => {
    let bool = !(timeLoss / animationTime >= percent);
    if (negative) bool = !bool;
    return `border-bottom-color: ${bool ? color : "transparent"};`;
  };
  const getBL = (percent: number) => {
    let bool = !(timeLoss / animationTime >= percent);
    if (negative) bool = !bool;
    return `border-left-color: ${bool ? color : "transparent"};`;
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
    border-right-color:  ${negative ? "transparent" : color};
  }
  ${br + "%"} {
    border-right-color: ${negative ? color : "transparent"};
  }
  ${Number(bb) - 0.01 + "%"} {
    border-bottom-color:${negative ? "transparent" : color};
  }
  ${bb + "%"} {
    border-bottom-color: ${negative ? color : "transparent"};
  }
  ${Number(bl) - 0.01 + "%"} {
    border-left-color:${negative ? "transparent" : color};
  }
  ${bl + "%"} {
    border-left-color: ${negative ? color : "transparent"};
  }
  100% {
    border-right-color: ${negative ? color : "transparent"};
    border-bottom-color: ${negative ? color : "transparent"};
    border-left-color: ${negative ? color : "transparent"}
  }
  `;
};

const rotateCircle = ({ timeLoss, animationTime }: KeyframesType) => keyframes`
0% {
  transform: rotate(${(360 * timeLoss) / animationTime}deg);
}
100% {
  transform: rotate(360deg);
}
`;

const overlay = ({
  color,
  negative,
  timeLoss,
  animationTime,
}: KeyframesType) => {
  const milestones = (animationTime * 3) / 4 - timeLoss;
  const bt = (
    ((milestones > 0 ? milestones : 0) * 100) /
    (animationTime - timeLoss)
  ).toFixed(2);
  return keyframes`
  0% {
    border-top-color: ${negative ? "#ffffff" : color};
  }
  ${Number(bt) - 0.01 + "%"} {
    border-top-color: ${negative ? "#ffffff" : color};
  }
  ${bt + "%"} {
    border-top-color: transparent;
  }
  99.99%{
    border-top-color: transparent;
  }
  100% {
    border-top-color: ${negative ? "#ffffff" : color};
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
  negative?: boolean;
  timeLoss: number;
  animationTime: number;
  borderWidth: number;
};

export const OverlayStyle = styled.div<OverlayStyleType>`
  position: absolute;
  inset: ${(p) => (p.negative ? -1 : 0)}px;
  border-radius: 100%;
  border: ${(p) => p.borderWidth + (p.negative ? 2 : 0)}px solid transparent;
  animation-name: ${(p) =>
    overlay({
      color: p.color,
      negative: p.negative,
      timeLoss: p.timeLoss,
      animationTime: p.animationTime,
    })};
  animation-duration: ${(p) => p.animationTime - p.timeLoss}s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

type CircleStyleType = {
  negative?: boolean;
  width: number;
  color: string;
  height: number;
  timeLoss: number;
  borderWidth: number;
  animationTime: number;
};

export const CircleStyle = styled.div<CircleStyleType>`
  width: ${(p) => p.width}px;
  height: ${(p) => p.height}px;
  position: relative;
  border-radius: 100%;
  &::before,
  &::after {
    content: "";
    border-radius: 100%;
    position: absolute;
    animation-duration: ${(p) => p.animationTime - p.timeLoss}s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  &::before {
    inset: 0;
    border: ${(p) => p.borderWidth}px solid
      ${(p) => (p.negative ? "transparent" : p.color)};
    animation-name: ${(p) =>
      borderCircle({
        color: p.color,
        negative: p.negative,
        timeLoss: p.timeLoss,
        animationTime: p.animationTime,
      })};
  }
  &::after {
    inset: ${(p) => (p.negative ? 0 : -1)}px;
    border: ${(p) => p.borderWidth + (p.negative ? 0 : 2)}px solid transparent;
    border-top-color: ${(p) => (p.negative ? p.color : "#ffffff")};
    animation-name: ${(p) =>
      rotateCircle({
        timeLoss: p.timeLoss,
        animationTime: p.animationTime,
      })};
  }
`;
