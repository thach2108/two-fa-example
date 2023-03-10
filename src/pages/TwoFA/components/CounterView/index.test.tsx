import { render } from "@testing-library/react";
import CounterView from ".";

const Counter = ({ curentTime = 60, reRefeshFunc = () => {} }) => {
  return (
    <CounterView
      animationTime={60}
      currentTime={curentTime}
      onRefresh={reRefeshFunc}
    />
  );
};

test("Render the counter successfully", () => {
  const c = 5;
  const { getByText } = render(<Counter curentTime={c} />);
  const textTime = getByText(c);
  expect(textTime).toBeInTheDocument();
});

test(`Refresh the code if curentTime === 0 || 60`, () => {
  const reRefeshFunc = jest.fn(() => {});
  render(<Counter reRefeshFunc={reRefeshFunc} />);
  /**
   * the refresh function will be called
   */
  expect(reRefeshFunc).toBeCalled();
});
