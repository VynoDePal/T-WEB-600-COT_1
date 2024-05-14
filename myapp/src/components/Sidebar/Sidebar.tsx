import React from "react";

import {
  MdDashboard,
  MdShoppingCart,
  MdAssignment,
  MdPeople,
  MdPerson,
  MdPayment,
  MdSettings,
  MdExitToApp,
} from "react-icons/md";

interface SidebarProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setCurrentPage }) => {
  return (
    <section className="w-full sm:w-1/2 lg:w-1/5 h-screen bg-black text-white">
      <div className="flex items-center p-10">
        <img
          src="./img/icon/icon-panier-white.png"
          alt="Panier"
          className="h-12"
        />
        <span className="font-bold text-3xl mt-6">ECOMMERCE</span>
      </div>
      <div className="m-10">
        <h2 className="font-bold m-5 text-xl text-[#A8C0CF]">MENU</h2>
        <ul className="mt-4">
          <li
            className="flex items-center hover:bg-[#B8B8B6] hover:bg-opacity-25 h-12 mb-8"
            onClick={() => setCurrentPage("dashboard")}
          >
            <MdDashboard className="m-5 w-8 h-8" />
            <span className="text-xl">Dashboard</span>
          </li>

          <li
            className="flex items-center hover:bg-[#B8B8B6] hover:bg-opacity-25 w-55 h-12 mb-8"
            onClick={() => setCurrentPage("productAdmin")}
          >
            <MdShoppingCart className="m-5 w-8 h-8" />{" "}
            <span className="text-xl">Gestion des Produits</span>
          </li>
          <li
            className="flex items-center hover:bg-[#B8B8B6] hover:bg-opacity-25 w-55 h-12 mb-8"
            onClick={() => setCurrentPage("commandes")}
          >
            <MdAssignment className="m-5 w-8 h-8" />{" "}
            <span className="text-xl">Gestion Commandes</span>
          </li>
          <li
            className="flex items-center hover:bg-[#B8B8B6] hover:bg-opacity-25 w-55 h-12 mb-8"
            onClick={() => setCurrentPage("users")}
          >
            <MdPeople className="m-5 w-8 h-8" />{" "}
            <span className="text-xl">Gestion des Utilisateurs</span>
          </li>
          <li
            className="flex items-center hover:bg-[#B8B8B6] hover:bg-opacity-25 w-55 h-12 mb-8"
            onClick={() => setCurrentPage("transactions")}
          >
            <MdPayment className="m-5 w-8 h-8" />{" "}
            <span className="text-xl">Gestion des transactions</span>
          </li>
          <li
            className="flex items-center hover:bg-[#B8B8B6] hover:bg-opacity-25 w-55 h-12 mb-8"
            onClick={() => setCurrentPage("profil")}
          >
            <MdPerson className="m-5 w-8 h-8" />{" "}
            <span className="text-xl">Profil</span>
          </li>
          <li
            className="flex items-center hover:bg-[#B8B8B6] hover:bg-opacity-25 w-55 h-12"
            onClick={() => setCurrentPage("parametres")}
          >
            <MdSettings className="m-5 w-8 h-8" />{" "}
            <span className="text-xl">Paramètres</span>
          </li>
        </ul>
      </div>

      <div className="m-10">
        <h2 className="font-bold m-5 text-xl text-[#A8C0CF]">AUTRES</h2>
        <ul className="mt-4">
          <li className="flex items-center hover:bg-[#B8B8B6] hover:bg-opacity-25 w-55 h-12">
            <MdExitToApp className="m-5 w-8 h-8" />{" "}
            <span className="text-xl">Se déconnecter</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
