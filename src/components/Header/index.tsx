import { ReactComponent as PlusIcon } from "assets/svg/plus-alt-svgrepo-com.svg";
import { ReactComponent as LeftArrowIcon } from "assets/svg/left-lg-svgrepo-com.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderPath } from "utils/eums";

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="flex justify-between pb-3">
      {pathname === HeaderPath.LIST ? (
        <button type="button" className="text-red-500">
          Edit
        </button>
      ) : (
        <button
          type="button"
          className="text-red-500"
          onClick={() => {
            navigate("/");
          }}
        >
          <LeftArrowIcon />
        </button>
      )}
      {pathname === HeaderPath.LIST ? (
        <h1 data-testid={`header-list-page`} className="brand font-bold">
          CMC
        </h1>
      ) : (
        <h1 data-testid={`header-create-page`}>Create new item</h1>
      )}
      {pathname === HeaderPath.LIST ? (
        <button
          type="button"
          className="text-red-500"
          onClick={() => {
            navigate("/create");
          }}
        >
          <PlusIcon />
        </button>
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default Header;
