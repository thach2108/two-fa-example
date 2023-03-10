import TwoFAStore from "./TwoFAStore";

jest.setTimeout(100000);
const name = "Test counter";

test(`Test the Counter`, async () => {
  const currentTime = 10;
  const twoFA = new TwoFAStore(0, name, 60, currentTime);
  await new Promise<string>((resolve) =>
    setTimeout(() => resolve(""), currentTime * 1000)
  );
  expect(twoFA.currentTime).toEqual(1);
});

test(`Test the Looping Counter and Change the code after each Looping Counter`, async () => {
  const currentTime = 5;
  const twoFA = new TwoFAStore(0, name, 60, currentTime);
  const oldCode = twoFA.code;
  await new Promise<string>((resolve) =>
    setTimeout(() => resolve(""), (currentTime + 60) * 1000)
  );
  expect(twoFA.currentTime).toEqual(1);
  expect(twoFA.code).not.toEqual(oldCode);
});
