import cx from "classnames";

export type Props = {
  className?: string;
};

const Divider = ({ className }: Props) => {
  return <div className={cx([" border-b", className])} />;
};

export default Divider;
