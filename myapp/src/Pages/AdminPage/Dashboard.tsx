import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import { MdVisibility, MdAddShoppingCart, MdShoppingBag } from "react-icons/md";

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
const Dashboard: React.FC = () => {
  const data = [
    { name: "Page A", uv: 0, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 200, pv: 1500, amt: 2400 },
    { name: "Page A", uv: 100, pv: 2000, amt: 2400 },
    { name: "Page A", uv: 400, pv: 2000, amt: 2400 },
  ];
  const ordersTotal = 1500;
  const transactionsTotal = 2500;
  const usersCount = 500;
  const recentOrders = [
    { id: 1, name: "Ordi", statut: "en cours", date: new Date(), total: 100 },
    { id: 2, name: "Ordi", statut: "en cours", date: new Date(), total: 45 },
    { id: 3, name: "Ordi", statut: "terminé", date: new Date(), total: 45 },
    { id: 3, name: "Ordi", statut: "en cours", date: new Date(), total: 45 },
    { id: 3, name: "Ordi", statut: "en cours", date: new Date(), total: 45 },
    { id: 3, name: "Ordi", statut: "en cours", date: new Date(), total: 45 },
  ];


  return (
    <div className="absolute inset-0 overflow-y-auto top-40 left-10 right-10">
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/2 lg:w-1/4 p-4 ">
          <div className="bg-white border border-gray-300 p-4 rounded-lg shadow">
            <MdVisibility className="w-10 h-10 bg-gray-300 p-2 rounded-full" />
            <h2 className="text-lg font-semibold mb-2">Vue d'ensemble</h2>
            <p className="text-3xl font-bold">{ordersTotal}</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
          <div className="bg-white border border-gray-300 p-4 rounded-lg shadow">
            <MdAddShoppingCart className="w-10 h-10 bg-gray-300 p-2 rounded-full" />
            <h2 className="text-lg font-semibold mb-2">Total des Profits</h2>
            <p className="text-3xl font-bold">{transactionsTotal}</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
          <div className="bg-white border border-gray-300 p-4 rounded-lg shadow">
            <MdShoppingBag className="w-10 h-10 bg-gray-300 p-2 rounded-full" />
            <h2 className="text-lg font-semibold mb-2">Total des produits </h2>
            <p className="text-3xl font-bold">{usersCount}</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
          <div className="bg-white border border-gray-300 p-4 rounded-lg shadow">
            <FaUserGroup className="w-10 h-10 bg-gray-300 p-2 rounded-full" />
            <h2 className="text-lg font-semibold mb-2">
              Total des utilisateurs
            </h2>
            <p className="text-3xl font-bold">{usersCount}</p>
          </div>
        </div>
        <div className="w-full p-4">
          <div className="bg-white border border-gray-300 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Graphique des ventes</h2>
            <div className="flex flex-row justify-around">
              <LineChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#000" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
              <LineChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#000" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-4">
          <div className="bg-white border border-gray-300 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Commandes récentes</h2>
            <table className="border-collapse bg-white text-left text-sm text-gray-500 mt-10  w-full">
              <thead className="bg-black">
                <tr className="text-white">
                  <th className="px-6 py-4 font-bold">Numero</th>
                  <th className="px-6 py-4 font-bold">Nom des Produits</th>
                  <th className="px-6 py-4 font-bold">Statut</th>
                  <th className="px-6 py-4 font-bold">Date commande</th>
                  <th className="px-6 py-4 font-bold">Total commande</th>
                </tr>
              </thead>
              <tbody className=" text-black font-bold">
                {" "}
                {recentOrders.map((order) => (
                  <tr key={order.id} className="h-20 hover:bg-gray-300 shadow">
                    {" "}
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.statut}</td>
                    <td>{order.date.toLocaleDateString()}</td>
                    <td>{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-1/2 p-4">
          <div className="bg-white border border-gray-300 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Les plus vendus</h2>
            <table className="border-collapse bg-white text-left text-sm text-gray-500 mt-10  w-full">
              <thead className="bg-black">
                <tr className="text-white">
                  <th className="px-6 py-4 font-bold">Numero</th>
                  <th className="px-6 py-4 font-bold">Nom des Produits</th>
                  <th className="px-6 py-4 font-bold">Statut</th>
                  <th className="px-6 py-4 font-bold">Date commande</th>
                  <th className="px-6 py-4 font-bold">Total commande</th>
                </tr>
              </thead>
              <tbody className=" text-black font-bold">
                {" "}
                {recentOrders.map((order) => (
                  <tr key={order.id} className="h-20 hover:bg-gray-300 shadow">
                    {" "}
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.statut}</td>
                    <td>{order.date.toLocaleDateString()}</td>
                    <td>{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
