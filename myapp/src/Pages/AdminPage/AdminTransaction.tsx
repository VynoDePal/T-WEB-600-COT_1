import React from "react";
import TableRow, {
  Transaction,
} from "../../components/Table/TableRowTransaction";

const AdminTransaction = () => {
  const transactions: Transaction[] = [
    { id: 1, mode: "Ordi", statut: "en cours", date: new Date(), Montant: 100 },
    { id: 1, mode: "Ordi", statut: "échoué", date: new Date(), Montant: 100 },
    { id: 1, mode: "Ordi", statut: "payé", date: new Date(), Montant: 100 },
    { id: 1, mode: "Ordi", statut: "en cours", date: new Date(), Montant: 100 },
    { id: 1, mode: "Ordi", statut: "en cours", date: new Date(), Montant: 100 },
    { id: 1, mode: "Ordi", statut: "en cours", date: new Date(), Montant: 100 },
  ];

  return (
    <div className="absolute inset-0 overflow-y-auto top-16">
      <h1 className="font-bold text-3xl m-20 text-center">
        LISTES DES TRANSACTIONS
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
                <th className="px-6 py-4 font-bold">Id Transaction</th>
                <th className="px-6 py-4 font-bold">Mode de paiement</th>
                <th className="px-6 py-4 font-bold">Statut</th>
                <th className="px-6 py-4 font-bold">Date du Paiement</th>
                <th className="px-6 py-4 font-bold">Montant</th>
                <th className="px-6 py-4 font-bold">Actions</th>

              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500 border-t border-gray-100 text-black font-bold">
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} transactions={transaction} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTransaction;
