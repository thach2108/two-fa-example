import { makeAutoObservable } from "mobx";
import React, { useContext } from "react";
import TwoFAStore from "./TwoFAStore";

export default class MainStore {
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * TwoFA
   */
  twoFAs: TwoFAStore[] = [];
  set2FA = (twoFAs: TwoFAStore[]) => {
    this.twoFAs = twoFAs;
  };

  update2FA = (value: TwoFAStore) => {
    const index = this.twoFAs.findIndex((t) => t.id === value.id);
    if (index !== -1) {
      this.twoFAs[index] = value;
    }
  };

  update2FACode = (id: number) => {
    const index = this.twoFAs.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.twoFAs[index].updateCode();
    }
  };

  add2FA = (code: TwoFAStore) => {
    this.twoFAs.push(code);
  };
}

export const MainStoreContext = React.createContext<MainStore>(
  null as unknown as MainStore
);

export const useMainStore = () => useContext(MainStoreContext);
