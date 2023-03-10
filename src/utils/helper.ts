import { ANIMATION_TIME } from "./consts";

/**
 * to <= resule <= from
 * @param from
 * @param to
 * @returns
 */
export const randX = (from: number = 0, to: number = ANIMATION_TIME) => {
  var a = Math.floor(Math.random() * (to - from)) + from;
  return a;
};

/**
 * code's length is 6
 * @param code
 * @returns
 */
export const formatCode = (code: number = 100000) => {
  code = code < 100000 ? 100000 : code;
  return (code / 1000).toFixed(3).replace(".", " ");
};
