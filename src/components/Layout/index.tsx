import Divider from "components/Divider";
import Header from "components/Header";
import cx from "classnames";

export type Props = {
  children: React.ReactNode;
  className?: string;
};

function Layout({ className, children }: Props) {
  return (
    <div
      className={cx([
        className,
        "layout mx-auto max-w-sm border rounded-3xl p-3 my-10",
      ])}
    >
      <Header />
      <Divider className="-mx-3" />
      {children}
    </div>
  );
}

export default Layout;
