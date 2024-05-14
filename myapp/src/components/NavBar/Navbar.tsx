import React, { useState } from "react";
import { MdWbSunny } from "react-icons/md";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import ModalLogin from "../Modal/ModalLogin";

const Navbar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  return (
    <div className="bg-black">
      <div className="container p-5 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="./img/icon/icon-panier-white.png"
            alt="Panier"
            className="h-8 lg:h-10"
          />
          <span className="font-bold text-l text-white lg:text-xl ml-2 lg:ml-4">
            Ecommerce
          </span>
        </div>
        <div className="hidden lg:flex items-center justify-center flex-grow">
          <nav>
            <ul className="text-l lg:text-xl font-bold text-white flex space-x-8">
              <li>
                <a href="/">Accueil</a>
              </li>
              <li>
                <a href="/">Services</a>
              </li>
              <li>
                <a href="/">Produits</a>
              </li>
              <li>
                <a href="/">Catégorie</a>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className="flex items-center space-x-5 lg:space-x-10 ml-auto"
          style={{ marginRight: "-350px" }}
        >
          <input
            type="text"
            placeholder="Recherche"
            className="bg-gray-100 rounded-md p-2 lg:p-3 border-black border-4"
            style={{ height: "6px" }}
          />

          <MdWbSunny className="h-6 lg:h-8 bg-white rounded-md w-8" />

          <button className="bg-white p-2 rounded-md" onClick={handleOpen}>
            <FaUserPlus />
          </button>
          <button className="bg-white p-2 rounded-md">
            <FaSignInAlt />
          </button>
        </div>
      </div>
      <ModalLogin isOpen={modalOpen} handleOpen={setModalOpen} />
    </div>
  );
};

export default Navbar;
