import cx from "classnames";
import CountDown from "pages/TwoFA/components/CountDown";
import { ReactComponent as AppIcon } from "assets/svg/app-1-svgrepo-com.svg";
import { useState } from "react";
import { formatCode } from "utils/helper";
import { observer } from "mobx-react-lite";
import { useMainStore } from "store";
import TwoFAStore from "store/TwoFAStore";

export type Props = {
  twoFA: TwoFAStore;
  className?: string;
  animationTime?: number;
  handleEnd?: () => void;
};

const TwoFAItem = ({
  twoFA,
  animationTime = 60,
  className,
  handleEnd = () => {},
}: Props) => {
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const { update2FACode } = useMainStore();
  const { id, iconUrl: icon, currentTime, code, name } = twoFA;

  const _handleEnd = () => {
    update2FACode(id);
    handleEnd();
  };

  return (
    <div
      className={cx([
        "flex justify-between items-center two-fa pb-3 pt-1 border-b",
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
              src={icon}
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
      <CountDown
        animationTime={animationTime}
        currentTime={currentTime}
        onEnd={_handleEnd}
      />
    </div>
  );
};

export default observer(TwoFAItem);
