/**
 * to <= resule <= from
 * @param from
 * @param to
 * @returns
 */
export const randX = (from: number = 0, to: number = 60) => {
  var a =
    Math.floor(Math.random() * (!!to ? to - from : 100)) + (!!from ? from : 0);
  return a;
};

/**
 * code's length is 6
 * @param code
 * @returns
 */
export const formatCode = (code: number = randX(100000, 999999)) => {
  return (code / 1000).toFixed(3).replace(".", " ");
};
