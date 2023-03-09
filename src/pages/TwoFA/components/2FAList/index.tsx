import TwoFAItem from "./item";
import { observer } from "mobx-react-lite";
import { useMainStore } from "store";
import TwoFAStore from "store/TwoFAStore";
import { useEffect } from "react";
import update from "immutability-helper";
import { mock2FAs } from "./mock";
import SortAble from "components/SortAble";

const TwoFAIItems = () => {
  const { twoFAs, set2FA } = useMainStore();

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const newTwoFAs = update(twoFAs, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, twoFAs[dragIndex] as TwoFAStore],
      ],
    });
    set2FA(newTwoFAs);
  };

  /**
   * This useEffect is used for demo
   */
  useEffect(() => {
    if (twoFAs.length) return;
    set2FA(mock2FAs.map((name, i) => new TwoFAStore(i, name)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {twoFAs.map((item, i) => (
        <SortAble key={item.id} id={item.id} index={i} moveCard={moveCard}>
          <TwoFAItem twoFA={item} />
        </SortAble>
      ))}
    </div>
  );
};

export default observer(TwoFAIItems);
