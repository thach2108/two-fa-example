import { lazy, Suspense } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainStoreProvider from "store/context";
import "./App.scss";

const TwoFAList = lazy(() => import("./pages/TwoFA/views/List"));
const Create2FA = lazy(() => import("./pages/TwoFA/views/Create"));

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
}

export default App;
