import { makeAutoObservable } from "mobx";
import { randX } from "utils/helper";

class TwoFAStore {
  constructor(id: number, name: string, currentTime?: number) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.code = randX(100000, 999999);
    this.currentTime = currentTime ? currentTime : randX(0, 60);
    this.iconUrl =
      randX(0, 100) % 2 ? "./assets/app/app-2.svg" : "./assets/app/app-1.svg";
  }

  id: number;
  name: string;
  currentTime: number;
  code: number;
  iconUrl: string;

  updateCode() {
    this.code = randX(100000, 999999);
  }
}

export default TwoFAStore;
