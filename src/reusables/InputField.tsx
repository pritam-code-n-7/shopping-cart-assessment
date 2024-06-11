import { InputTypes } from "./inputTypes";

const InputField = ({ type, placeholder, value, onChange }: InputTypes) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="p-2 border mb-2"
      />
    </div>
  );
};

export default InputField;
