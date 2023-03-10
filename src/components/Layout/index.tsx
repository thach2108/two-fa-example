import cx from "classnames";
import Divider from "components/Divider";
import Header from "components/Header";

export type Props = {
  children: React.ReactNode;
  className?: string;
};

function Layout({ className, children }: Props) {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div
        className={cx([
          className,
          "layout mx-auto max-w-sm w-full border rounded-3xl p-3 my-10",
          "col-span-2",
        ])}
      >
        <Header />
        <Divider className="-mx-3" />
        <div className="layout__body rounded-2xl">{children}</div>
      </div>
      <div className="mt-10 col-span-3">
        <div className="mb-4 font-semibold">
          The app's default value is the list includes random properties
          (iconUrl, currentTime and 2FA code).
        </div>
        <ul className="ml-5 mx-auto list-disc">
          <li className="mb-2">Max time for each looping is 60s.</li>
          <li className="mb-2">
            The code will be change and the currentTime will be reset to 60
            affter the couter is the end
          </li>
          <li className="mb-2">The list is Sortable</li>
          <li className="mb-2">
            Can create a new item including (currentTime: 60; a new random code
            and the name is the value is entered by user)
          </li>
          <li className="mb-2">Validate required field</li>
        </ul>
      </div>
    </div>
  );
}

export default Layout;
