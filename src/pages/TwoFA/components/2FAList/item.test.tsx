import { fireEvent, render, waitFor } from "@testing-library/react";
import TwoFAStore from "store/TwoFAStore";
import { randX } from "utils/helper";
import TwoFAItem from "./item";

const id = randX(0, 999999);
const mockData = new TwoFAStore(id, "Automation test");

test("Render the name successfully", () => {
  const { getByText } = render(<TwoFAItem twoFA={mockData} />);
  const appName = getByText(/Automation test/i);
  /**
   * the app's name is Automation test
   */
  expect(appName).toBeInTheDocument();
});

test("Render the code successfully", () => {
  const { getByTestId } = render(<TwoFAItem twoFA={mockData} />);
  const appCode = getByTestId(`two-fa-code-${id}`)
    .innerHTML.replace(" ", "")
    .split("");
  /**
   * the app's code have 6 chars
   */
  expect(appCode.length).toEqual(6);
});

test(`Render the image successfully`, async () => {
  const { container } = render(<TwoFAItem twoFA={mockData} />);
  await waitFor(() => {
    expect(container.querySelector(`img`)).toBeInTheDocument();
  });
});

test(`Render the failback image successfully`, async () => {
  const { container } = render(<TwoFAItem twoFA={mockData} />);
  const img = container.querySelector(`img`);
  img && fireEvent.error(img);
  await waitFor(() => {
    /**
     * the svg is the failback image
     */
    expect(container.querySelector(`svg`)).toBeInTheDocument();
  });
});
