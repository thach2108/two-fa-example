import { BrowserRouter as Router } from "react-router-dom";
import MainStoreProvider from "store/context";

const WrapperTest = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainStoreProvider>
      <Router>{children}</Router>
    </MainStoreProvider>
  );
};

export default WrapperTest;
