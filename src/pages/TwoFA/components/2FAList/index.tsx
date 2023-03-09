import TwoFAItem from "./item";
import { observer } from "mobx-react-lite";
import { useMainStore } from "store";
import TwoFAStore from "store/TwoFAStore";
import { useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import { mock2FAs } from "./mock";

const TwoFAIItems = () => {
  const { twoFAs, set2FA } = useMainStore();

  /**
   * This useEffect is used for demo
   */
  useEffect(() => {
    if (twoFAs.length) return;
    set2FA(mock2FAs.map((name, i) => new TwoFAStore(i, name)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactSortable list={twoFAs} setList={set2FA}>
      {twoFAs.map((item, i) => (
        <TwoFAItem key={i} twoFA={item} />
      ))}
    </ReactSortable>
  );
};

export default observer(TwoFAIItems);
