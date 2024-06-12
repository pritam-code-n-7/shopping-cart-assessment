import { buttonTypes } from "./buttonTypes";

const BlueButton = ({
  name,
  onClick,
  type,
  "aria-label": ariaLabel,
}: buttonTypes) => {
  return (
    <div>
      <button
        name={name}
        onClick={onClick}
        type={type}
        aria-label={ariaLabel}
        className="py-2 px-4 rounded bg-blue-600 text-white mt-2 "
      >
        {name}
      </button>
    </div>
  );
};

export default BlueButton;
