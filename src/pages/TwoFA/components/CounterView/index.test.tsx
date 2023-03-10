import { render } from "@testing-library/react";
import { ANIMATION_TIME } from "utils/consts";
import CounterView from ".";

test("Render the counter successfully", () => {
  const c = 5;
  const { getByText } = render(<CounterView currentTime={c} />);
  const textTime = getByText(c);
  expect(textTime).toBeInTheDocument();
});

test(`Refresh the code if curentTime === 0 || ${ANIMATION_TIME}`, () => {
  const reRefeshFunc = jest.fn(() => {});
  render(<CounterView onRefresh={reRefeshFunc} />);
  /**
   * the refresh function will be called
   */
  expect(reRefeshFunc).toBeCalled();
});
