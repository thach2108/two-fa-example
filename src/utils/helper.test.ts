import { ANIMATION_TIME } from "./consts";
import { formatCode, randX } from "./helper";

const times = 10000;

test(`random with default`, () => {
  const from = 0;
  const to = ANIMATION_TIME;
  for (let i = 0; i < times; i++) {
    const rand = randX();
    expect(rand >= from).toEqual(true);
    expect(rand <= to).toEqual(true);
  }
});

test(`random from x1 to x2 ${times} times`, () => {
  const from = 0;
  const to = 33;
  for (let i = 0; i < times; i++) {
    const rand = randX(from, to);
    expect(rand >= from).toEqual(true);
    expect(rand <= to).toEqual(true);
  }
});

test(`format the 2FA code width default`, () => {
  expect(formatCode()).toEqual("100 000");
});

test(`format the 2FA code`, () => {
  const codes: { [key: string]: string } = {
    "123456": "123 456",
    "123000": "123 000",
    "0": "100 000",
  };
  Object.keys(codes).forEach((code) => {
    expect(formatCode(Number(code))).toEqual(codes[code]);
  });
});
