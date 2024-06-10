import { buttonType } from "./buttonType";

const BlueButton = ({ name, onClick, type }: buttonType) => {
  return (
    <div> 
      <button
        name={name}
        onClick={onClick}
        type={type}
        className="py-2 px-4 rounded bg-blue-600 text-white mt-2"
      >
        {name}
      </button>
    </div>
  );
};

export default BlueButton;
