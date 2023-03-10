import { ANIMATION_TIME } from "utils/consts";
import TwoFAStore from "./TwoFAStore";

jest.setTimeout(100000);
const name = "Test counter";
const currentTime = 5;

test(`Test the Counter`, async () => {
  const twoFA = new TwoFAStore(0, name, ANIMATION_TIME, currentTime);
  await new Promise<string>((resolve) =>
    setTimeout(() => resolve(""), currentTime * 1000)
  );
  expect(twoFA.currentTime).toEqual(1);
});

test(`Test the Looping Counter and Change the code after each Looping Counter`, async () => {
  const twoFA = new TwoFAStore(0, name, ANIMATION_TIME, currentTime);
  const oldCode = twoFA.code;
  await new Promise<string>((resolve) =>
    setTimeout(() => resolve(""), (currentTime + ANIMATION_TIME) * 1000)
  );
  expect(twoFA.currentTime).toEqual(1);
  expect(twoFA.code).not.toEqual(oldCode);
});
