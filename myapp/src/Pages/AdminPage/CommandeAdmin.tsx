import React, { useEffect, useState } from "react";
import TableRow, { Commande } from "../../components/Table/TableRowCommande";
import axios from "axios";

const CommandeAdmin = () => {
  const [commande, setCommande] = useState<Commande[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products");
        setCommande(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="absolute inset-0 overflow-y-auto top-16">
      <h1 className="font-bold text-3xl m-20 text-center">
        LISTES DES COMMANDES
      </h1>
      <div className="bg-white ml-10 mr-10 p-5 shadow-xl rounded-xl">
        <div className="flex justify-end">
          <div className="flex flex-row mt-10">
            <input
              className="mr-5 p-3 h-10"
              placeholder="Rechercher..."
              type="search"
            />
            <button className="bg-black text-white text-xl font-bold p-3 rounded mr-5 h-10">
              Rechercher
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg m-5 flex justify-center">
          <table className="border-collapse bg-white text-left text-sm text-gray-500 mt-10  w-full">
            <thead className="bg-black">
              <tr className="text-white">
                <th className="px-6 py-4 font-bold">Numero</th>
                <th className="px-6 py-4 font-bold">Prix</th>
                <th className="px-6 py-4 font-bold">Date commande</th>
                <th className="px-6 py-4 font-bold">Total commande</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500 border-t border-gray-100 text-black font-bold">
              {commande.map((commande) => (
                <TableRow key={commande.id} commande={commande} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommandeAdmin;
