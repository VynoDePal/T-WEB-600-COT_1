import React from "react";
import { MdEdit } from "react-icons/md";

interface ButtonEditProps {
  onClick?: () => void; 
}

const ButtonEdit: React.FC<ButtonEditProps> = (props) => {
  return (
    <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded">
      <MdEdit />
    </button>
  );
};

export default ButtonEdit;
