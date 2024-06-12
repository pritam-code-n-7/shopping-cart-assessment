import { InputTypes } from "./inputTypes";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  id,
  min,
  max,
  htmlFor,
  label,
  "aria-label": ariaLabel,
}: InputTypes) => {
  return (
    <div className="mr-2">
      <label htmlFor={htmlFor} className="block mb-2 mr-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        id={id}
        min={min}
        max={max}
        aria-label={ariaLabel}
        className="mb-2 md:mb-0 md:mr-4 w-full text-black py-1 px-2 "
      />
    </div>
  );
};

export default InputField;
