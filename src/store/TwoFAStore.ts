import { action, makeAutoObservable } from "mobx";
import { ANIMATION_TIME } from "utils/consts";
import { randX } from "utils/helper";

class TwoFAStore {
  constructor(
    id: number,
    name: string,
    animationTime: number = ANIMATION_TIME,
    currentTime: number = randX(0, animationTime)
  ) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.code = randX(100000, 999999);
    this.animationTime = animationTime;
    this.currentTime = currentTime;
    this.iconUrl =
      randX(0, 100) % 2 ? "./assets/app/app-2.svg" : "./assets/app/app-1.svg";

    this.interval = setInterval(() => {
      action(() => {
        this.countDown();
      })();
    }, 1000);
  }

  id: number;
  name: string;
  currentTime: number;
  animationTime: number;
  code: number;
  iconUrl: string;
  interval: any;

  updateCode() {
    this.code = randX(100000, 999999);
  }

  countDown() {
    this.currentTime--;

    if (this.currentTime <= 0) {
      this.currentTime = this.animationTime;
      this.updateCode();
    }
  }

  destroy() {
    clearInterval(this.interval);
  }
}

export default TwoFAStore;
