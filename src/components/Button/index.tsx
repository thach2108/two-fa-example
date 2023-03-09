import cx from "classnames";
import ButtonStyle from "./styles";

interface Props {
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
  dataTestid?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({
  type,
  className,
  children,
  dataTestid,
  onClick = () => {},
}: Props) => {
  return (
    <ButtonStyle
      data-testid={dataTestid}
      type={type}
      className={cx([
        "px-5 rounded-2xl bg-red-400 text-white  font-semibold hover:bg-red-500 transition-all",
        className,
      ])}
      onClick={onClick}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;
