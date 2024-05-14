import React, { useState } from "react";
import { MdAddShoppingCart, MdFavorite } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa6";
import ModalLogin from "../Modal/ModalLogin";
import ModalPanier from "../Modal/ModalPanier";

export default function NavBarDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenPanier, setModalOpenPanier] = useState(false);

  const handleOpenPanier = () => {
    setModalOpenPanier(true);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  return (
    <nav className="absolute top-0 bottom-5 left-0 sm:h-20 w-full shadow-md bg-white flex items-center justify-between px-4 pb-2">
      <div className="flex items-center">
        <img
          src="./img/icon/icon-cart-black.png"
          alt=""
          className="w-10 h-10"
        />
        <p className="font-bold mt-3 text-xl">Ecommerce</p>
        <input
          type="search"
          className="flex-grow border-black border-4 ml-10 mt-4 p-2 rounded-full"
          style={{ width: "700px" }}
          placeholder="Rechercher..."
        />
        <button className="bg-black text-white text-xl font-bold p-3 rounded-full mr-5 ml-5 mt-4">
          Rechercher
        </button>
      </div>
      <div className="flex items-center mr-10 mt-4">
        <div className="mr-5">
          <div className="flex flex-row">
            <FaClipboardList className="h-8 w-8" />
            <p className=" p-2">Commandes</p>
          </div>
        </div>
        <div className="mr-5">
          <div className="flex flex-row">
            <MdFavorite className="h-8 w-8" />
            <p className=" p-2">Favoris</p>
          </div>
        </div>
        <div className="mr-5">
          <div className="flex flex-row">
            <MdAddShoppingCart className="h-8 w-8" onClick={handleOpenPanier} />
            <p className=" p-2">Panier</p>
          </div>
        </div>
        <div className="mr-5">
          <button
            onClick={handleOpen}
            className="border-black border-4 p-3 w-30 rounded-full"
          >
            Login
          </button>
          <ModalLogin isOpen={modalOpen} handleOpen={setModalOpen} />
        </div>
      </div>
      <ModalPanier
        isOpen={modalOpenPanier}
        onClose={() => setModalOpenPanier(false)}
      />
    </nav>
  );
}
