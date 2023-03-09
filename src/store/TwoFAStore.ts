import { makeAutoObservable } from "mobx";
import { randX } from "utils/helper";

class TwoFAStore {
  constructor(id: number, name: string, currentTime?: number) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    if (currentTime) this.currentTime = currentTime;
  }

  id: number;
  name: string;
  currentTime: number = randX(0, 60);
  code: number = randX(100000, 999999);
  iconUrl: string = "./assets/app/app-1.svg";

  updateCode() {
    this.code = randX(100000, 999999);
  }
}

export default TwoFAStore;
