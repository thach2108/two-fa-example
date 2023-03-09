import { makeAutoObservable } from "mobx";
import React, { useContext } from "react";
import TwoFA from "./Classes/TwoFA";

export default class MainStore {
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * TwoFA
   */
  twoFAs: TwoFA[] = [];
  set2FA = (twoFAs: TwoFA[]) => {
    this.twoFAs = twoFAs;
  };

  update2FA = (value: TwoFA) => {
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

  add2FA = (code: TwoFA) => {
    this.twoFAs.push(code);
  };

  /**
   *
   */
  anyStore: any[] = [];
  anyFunc = () => {};
}

export const MainStoreContext = React.createContext<MainStore>(
  null as unknown as MainStore
);

export const useMainStore = () => useContext(MainStoreContext);
