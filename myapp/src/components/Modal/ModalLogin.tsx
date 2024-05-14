import React from "react";
import Login from "../../Pages/ClientPage/Login";

interface ModalLoginProps {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({ isOpen, handleOpen }) => {
  return (
    <div>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <Login />
        </div>
      )}
    </div>
  );
};

export default ModalLogin;
