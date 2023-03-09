import { render } from "@testing-library/react";
import TwoFAStore from "store/TwoFAStore";
import { randX } from "utils/helper";
import WrapperTest from "WraperTest";
import TwoFAItem from "./item";

const curentTime = 5;
const id = randX(0, 999999);
jest.setTimeout((curentTime + 2) * 1000);
const mockData = new TwoFAStore(id, "Automation test", curentTime);

const Item = ({ twoFA = mockData, reRenderFunc = () => {} }) => {
  return (
    <WrapperTest>
      <TwoFAItem animationTime={60} twoFA={twoFA} />
    </WrapperTest>
  );
};

test("Render the name successfully", () => {
  const { getByText } = render(<Item twoFA={mockData} />);
  const appName = getByText(/Automation test/i);
  /**
   * the app's name is Automation test
   */
  expect(appName).toBeInTheDocument();
});

test("Render the code successfully", () => {
  const { getByTestId } = render(<Item twoFA={mockData} />);
  const appCode = getByTestId(`two-fa-code-${id}`)
    .innerHTML.replace(" ", "")
    .split("");
  /**
   * the app's code have 6 chars
   */
  expect(appCode.length).toEqual(6);
});

test(`Refresh the code affter ${curentTime}(s)`, async () => {
  global.console.error = jest.fn();
  const reRenderFunc = jest.fn(() => {
    /**
     * if the couter < 0: the app's code will be refreshed
     */
    mockData.updateCode();
  });
  const { getByTestId, rerender } = render(
    <Item twoFA={mockData} reRenderFunc={reRenderFunc} />
  );
  const prevCode = getByTestId(`two-fa-code-${id}`).innerHTML;
  await new Promise<string>((resolve) =>
    setTimeout(() => resolve(""), (curentTime + 1) * 1000)
  );
  rerender(<Item twoFA={mockData} />);
  const curentCode = getByTestId(`two-fa-code-${id}`).innerHTML;
  /**
   * the refresh function will be called
   */
  expect(reRenderFunc).toBeCalled();
  /**
   * after refresh, the prev code is different the current code
   */
  expect(curentCode).not.toEqual(prevCode);
});
