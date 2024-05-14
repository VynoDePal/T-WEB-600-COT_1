import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavBarDashboard from "../../components/NavBar/NavBarDashboard";
import ProductAdmin from "./ProductAdmin";
import Dashboards from "./Dashboard";
import CommandeAdmin from "./CommandeAdmin";
import AdminUsers from "./AdminUsers";
import AdminTransaction from "./AdminTransaction";
import Profil from "./Profil";

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");

  console.log(currentPage);
  return (
    <div className="flex flex-row h-full w-full">
      <Sidebar setCurrentPage={setCurrentPage} />
      <section className="w-4/5 h-screen bg-[#F2F5FA]">
        <div className="relative h-full">
          <NavBarDashboard />
          {currentPage === "productAdmin" && <ProductAdmin />}
          {currentPage === "dashboard" && <Dashboards />}
          {currentPage === "commandes" && <CommandeAdmin />}
          {currentPage === "users" && <AdminUsers />}
          {currentPage === "transactions" && <AdminTransaction />}
          {currentPage === "profil" && <Profil />}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
