import { action, makeObservable, observable } from "mobx";
import { randX } from "utils/helper";

class TwoFA {
  id: number;
  name: string;
  currentTime: number = randX(0, 60);
  code: number = randX(100000, 999999);
  icon: string = "./assets/app/app-1.svg";

  constructor(id: number, name: string, currentTime?: number) {
    this.id = id;
    this.name = name;
    if (currentTime) this.currentTime = currentTime;
    makeObservable(this, {
      id: true,
      name: true,
      icon: true,
      code: observable,
      currentTime: observable,
      updateCode: action,
    });
  }

  updateCode() {
    this.code = randX(100000, 999999);
  }
}

export default TwoFA;
