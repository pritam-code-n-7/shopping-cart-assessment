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
}: InputTypes) => {
  return (
    <div>
      <label htmlFor={htmlFor} className="block mb-2">
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
        className="p-2 border mb-2"
      />
    </div>
  );
};

export default InputField;
