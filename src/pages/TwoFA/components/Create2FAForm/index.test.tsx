import { act, render, screen } from "@testing-library/react";
import CreateForm from ".";
import WrapperTest from "WraperTest";

const Creater = () => {
  return (
    <WrapperTest>
      <CreateForm />
    </WrapperTest>
  );
};

test("Validate empty 'name' field", async () => {
  await act(async () => await render(<Creater />));
  const submitBtn = screen.getByTestId(`submit-btn`);
  await act(async () => await submitBtn.click());
  const errorInputName = screen.getByTestId(`error-input-name`);
  expect(errorInputName).toBeInTheDocument();
});
