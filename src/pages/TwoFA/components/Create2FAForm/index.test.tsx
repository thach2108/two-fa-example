import { act, render, screen } from "@testing-library/react";
import MainStoreProvider from "store/context";
import CreateForm from ".";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <MainStoreProvider>
      <Router>
        <CreateForm />
      </Router>
    </MainStoreProvider>
  );
};

test("Validate empty 'name' field", async () => {
  await act(async () => await render(<App />));
  const submitBtn = screen.getByTestId(`submit-btn`);
  await act(async () => await submitBtn.click());
  const errorInputName = screen.getByTestId(`error-input-name`);
  expect(errorInputName).toBeInTheDocument();
});
