import { render } from "@testing-library/react";
import { HeaderPath } from "utils/eums";
import Header from ".";
import WrapperTest from "WraperTest";

const Head = () => {
  return (
    <WrapperTest>
      <Header />
    </WrapperTest>
  );
};

const createPath = (url: string) => {
  Object.defineProperty(window, "location", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: new URL(url),
  });
};

test(`Is creation page; Uri=${HeaderPath.CREATE}`, () => {
  let url = `http://localhost:3000${HeaderPath.CREATE}`;
  createPath(url);
  const { getByTestId } = render(<Head />);
  const brandName = getByTestId(`header-create-page`);
  /**
   * the app's name have is Automation test
   */
  expect(brandName).toBeInTheDocument();
  expect(brandName.innerHTML).toEqual("Create new item");
});

test(`Is list page; Uri=${HeaderPath.LIST}`, () => {
  let url = `http://localhost:3000${HeaderPath.LIST}`;
  createPath(url);
  const { getByTestId } = render(<Head />);
  const brandName = getByTestId(`header-list-page`);
  /**
   * the app's name have is Automation test
   */
  expect(brandName).toBeInTheDocument();
  expect(brandName.innerHTML).toEqual("CMC");
});
