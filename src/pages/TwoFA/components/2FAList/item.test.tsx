import { fireEvent, render, waitFor } from "@testing-library/react";
import TwoFAStore from "store/TwoFAStore";
import { randX } from "utils/helper";
import TwoFAItem from "./item";

const id = randX(0, 999999);
const name = "Automation test";
const mockData = new TwoFAStore(id, name);

test("Render successfully", async () => {
  const { container, getByText, getByTestId } = render(
    <TwoFAItem twoFA={mockData} />
  );
  const appName = getByText(name);
  const appCode = getByTestId(`two-fa-code-${id}`)
    .innerHTML.replace(" ", "")
    .split("");
  /**
   * the app's name is Automation test
   */
  expect(appName).toBeInTheDocument();
  /**
   * the app's code have 6 chars
   */
  expect(appCode.length).toEqual(6);
  /**
   * the image is render successfully
   */
  expect(container.querySelector(`img`)).toBeInTheDocument();
});

test(`Render the failback image successfully`, async () => {
  const { container } = render(<TwoFAItem twoFA={mockData} />);
  const img = container.querySelector(`img`);
  img && fireEvent.error(img);
  await waitFor(() => {
    /**
     * the failback image render successfully
     */
    expect(container.querySelector(`svg`)).toBeInTheDocument();
  });
});
