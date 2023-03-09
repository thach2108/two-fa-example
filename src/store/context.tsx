import React, { useRef } from "react";
import MainStore, { MainStoreContext } from "store";

type Props = {
  children: React.ReactNode;
};

export default function MainStoreProvider({ children }: Props) {
  const store = useRef(new MainStore());

  return (
    <MainStoreContext.Provider value={store.current}>
      {children}
    </MainStoreContext.Provider>
  );
}
