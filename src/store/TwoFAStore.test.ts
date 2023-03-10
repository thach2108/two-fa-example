import TwoFAStore from "./TwoFAStore";

jest.setTimeout(71000);

test(`Test the Counter`, async () => {
  const currentTime = 10;
  const twoFA = new TwoFAStore(0, "Test counter", 60, currentTime);
  await new Promise<string>((resolve) =>
    setTimeout(() => resolve(""), currentTime * 1000)
  );
  expect(twoFA.currentTime).toEqual(1);
});

test(`Test the Looping Counter`, async () => {
  const currentTime = 10;
  const twoFA = new TwoFAStore(0, "Test counter", 60, currentTime);
  await new Promise<string>((resolve) =>
    setTimeout(() => resolve(""), (currentTime + 60) * 1000)
  );
  expect(twoFA.currentTime).toEqual(1);
});
