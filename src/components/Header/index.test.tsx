import { render } from "@testing-library/react";
import { HeaderPath } from "utils/eums";
import { BrowserRouter as Router } from "react-router-dom";
import Header from ".";

const App = () => {
  return (
    <Router>
      <Header />
    </Router>
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
  const { getByTestId } = render(<App />);
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
  const { getByTestId } = render(<App />);
  const brandName = getByTestId(`header-list-page`);
  /**
   * the app's name have is Automation test
   */
  expect(brandName).toBeInTheDocument();
  expect(brandName.innerHTML).toEqual("CMC");
});
