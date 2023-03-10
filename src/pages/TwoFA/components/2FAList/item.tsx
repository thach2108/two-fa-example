import { ReactComponent as AppIcon } from "assets/svg/app-1-svgrepo-com.svg";
import cx from "classnames";
import { observer } from "mobx-react-lite";
import CounterView from "pages/TwoFA/components/CounterView";
import { useState } from "react";
import TwoFAStore from "store/TwoFAStore";
import { formatCode } from "utils/helper";

export type Props = {
  twoFA: TwoFAStore;
  index?: number;
  className?: string;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
};

const TwoFAItem = ({ index, twoFA, className }: Props) => {
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const { id, iconUrl, currentTime, code, name, animationTime } = twoFA;

  return (
    <div
      className={cx([
        "flex justify-between items-center two-fa pb-3 pt-1 border-b cursor-grab -mx-3 px-3",
        className,
      ])}
    >
      <div className="flex items-end">
        {isDefault ? (
          <AppIcon className="mr-2" width={40} height={40} />
        ) : (
          <div className="two-fa__logo mr-2">
            <img
              className="cover-img"
              src={iconUrl}
              alt="logo"
              onError={() => {
                setIsDefault(true);
              }}
            />
          </div>
        )}
        <div>
          <small className="text-xs">{name}</small>
          <p
            data-testid={`two-fa-code-${id}`}
            className="text-3xl leading-none font-semibold"
          >
            {formatCode(code)}
          </p>
        </div>
      </div>
      <CounterView
        index={index}
        animationTime={animationTime}
        currentTime={currentTime}
      />
    </div>
  );
};

export default observer(TwoFAItem);
