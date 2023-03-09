import MainStoreProvider from "store/context";
import { BrowserRouter as Router } from "react-router-dom";

const WrapperTest = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainStoreProvider>
      <Router>{children}</Router>
    </MainStoreProvider>
  );
};

export default WrapperTest;
