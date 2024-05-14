import React from "react";
import { MdDelete } from "react-icons/md";

interface ButtonDeleteProps {
  onClick?: () => void;
}

const ButtonDelete: React.FC<ButtonDeleteProps> = (props) => {
  console.log(props.onClick);
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={props.onClick}
    >
      <MdDelete />
    </button>
  );
};
export default ButtonDelete;
