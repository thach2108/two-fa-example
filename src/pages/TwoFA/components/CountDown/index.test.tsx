import { render } from "@testing-library/react";
import CountDown from ".";

const curentTime = 5;
jest.setTimeout((curentTime + 2) * 1000);

const Counter = ({ reRenderFunc = () => {} }) => {
  return (
    <CountDown
      animationTime={60}
      currentTime={curentTime}
      onEnd={reRenderFunc}
    />
  );
};

test("Render the counter successfully", () => {
  const { getByText } = render(<Counter />);
  const textTime = getByText(curentTime);
  expect(textTime).toBeInTheDocument();
});

test(`Refresh the code affter ${curentTime}(s)`, async () => {
  global.console.error = jest.fn();
  const reRenderFunc = jest.fn(() => {
    /**
     * if the couter <= 0: the handle end function will be call
     */
  });
  const { rerender } = render(<Counter reRenderFunc={reRenderFunc} />);
  await new Promise<string>((resolve) =>
    setTimeout(() => resolve(""), (curentTime + 1) * 1000)
  );
  rerender(<Counter />);
  /**
   * the refresh function will be called
   */
  expect(reRenderFunc).toBeCalled();
});
