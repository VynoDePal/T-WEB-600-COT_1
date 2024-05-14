import React from "react";
import Card from "../../components/Card/Card";
import Sidebar from "../../components/Sidebar/SidebarProduct";
import NavBarDashboard from "../../components/NavBar/NavBarDashboard";
import Footer from "../../components/footer/footer";

export default function Product() {
  return (
    <div className="bg-gray-100 ">
      <NavBarDashboard />
      <div className="flex flex-row m-10">
        <section
          className="w-1/4 rounded-3xl h-full bg-white shadow-md"
          style={{
            width: "300px",
            marginTop: "90px",
            marginLeft: "20px",
            padding: "20px",
          }}
        >
          <Sidebar />
        </section>
        <section className="w-4/5 h-full bg-[#F2F5FA] mt-20">
          <div className="relative h-full">
            <div
              className="absolute top-[4rem] left-0 right-0 mt-8 lg:mx-16 grid grid-cols-4 lg:grid-cols-4 gap-1 lg:gap-0"
              style={{ marginRight: "-200px" }}
            >
              <Card />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
