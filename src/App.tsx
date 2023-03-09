import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainStoreProvider from "store/context";

import "./assets/svg/svg.scss";
import "./App.scss";

const TwoFAList = lazy(() => import("./pages/TwoFA/views/List"));
const Create2FA = lazy(() => import("./pages/TwoFA/views/Create"));

function App() {
  return (
    <MainStoreProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<TwoFAList />} />
            <Route path="/create" element={<Create2FA />} />
          </Routes>
        </Suspense>
      </Router>
    </MainStoreProvider>
  );
}

export default App;
