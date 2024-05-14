import React, { useState } from "react";
import TableRow, { Users } from "../../components/Table/TableRowUsers";
import ModalForm from "../../components/Modal/ModalFormAjoutUser";

const AdminUsers = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const users: Users[] = [
    { id: 1, name: "Agossou Jean", role: "admin", statut: "en ligne" },
    { id: 1, name: "Agossou Jean", role: "admin", statut: "en ligne" },
    { id: 1, name: "Agossou Jean", role: "admin", statut: "en ligne" },
    { id: 1, name: "Agossou Jean", role: "admin", statut: "en ligne" },
    { id: 1, name: "Agossou Jean", role: "admin", statut: "en ligne" },
    { id: 1, name: "Agossou Jean", role: "admin", statut: "en ligne" },
    { id: 1, name: "Agossou Jean", role: "admin", statut: "en ligne" },
  ];

  return (
    <div className="absolute inset-0 overflow-y-auto top-16">
      <h1 className="font-bold text-3xl m-20 text-center">
        LISTES DES UTILISATEURS
      </h1>
      <div className="bg-white ml-10 mr-10 p-5 shadow-xl rounded-xl">
        <div className="flex justify-end">
          <button
            className="bg-black text-white text-xl font-bold p-5 rounded mr-5"
            onClick={handleOpen}
          >
            Ajouter un utilisateur
          </button>
        </div>
        <div className="overflow-hidden rounded-lg m-5 flex justify-center">
          <table className="border-collapse bg-white text-left text-sm text-gray-500 mt-10  w-full">
            <thead className="bg-black">
              <tr className="text-white">
                <th className="px-6 py-4 font-bold">Numero</th>
                <th className="px-6 py-4 font-bold">Nom Utilisateurs</th>
                <th className="px-6 py-4 font-bold">Rôle</th>
                <th className="px-6 py-4 font-bold">Statut</th>
                <th className="px-6 py-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500 border-t border-gray-100 text-black font-bold">
              {users.map((user) => (
                <TableRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalForm isOpen={modalOpen} handleOpen={setModalOpen} />
    </div>
  );
};

export default AdminUsers;
