import { randX } from "./helper";

const from = 0;
const to = 30;
const times = 10000;

test(`random from ${from} to ${to} ${times} times`, () => {
  for (let i = 0; i < times; i++) {
    const rand = randX(from, to);
    expect(rand >= from).toEqual(true);
    expect(rand <= to).toEqual(true);
  }
});
