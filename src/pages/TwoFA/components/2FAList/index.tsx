import TwoFAItem from "./item";
import { observer } from "mobx-react-lite";
import { useMainStore } from "store";
import TwoFA from "store/Classes/TwoFA";
import { useEffect } from "react";
import { ReactSortable } from "react-sortablejs";

const mocks = [
  "App name",
  "App name 2",
  "App name 3",
  "App name 4",
  "App name 5",
  "App name 6",
];

const TwoFAIItems = () => {
  const { twoFAs, set2FA } = useMainStore();

  /**
   * (This useEffect is used for demo)
   */
  useEffect(() => {
    if (twoFAs.length) return; // test
    set2FA(mocks.map((name, i) => new TwoFA(i, name)));
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
