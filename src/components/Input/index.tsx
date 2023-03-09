import cx from "classnames";
import InputStyle from "./styles";

interface Props {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  value?: string;
  className?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  name,
  label,
  value,
  error,
  className,
  placeholder,
  onChange = () => {},
}: Props) => {
  return (
    <div className={cx([className])}>
      {label ? (
        <label className="block" htmlFor={name}>
          {label}
        </label>
      ) : (
        <></>
      )}
      <InputStyle
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        className={cx(["border px-4 rounded-2xl outline-red-100"])}
        onChange={onChange}
      />
      {error ? (
        <p
          data-testid={`error-input-${name}`}
          className="px-4 text-xs text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
