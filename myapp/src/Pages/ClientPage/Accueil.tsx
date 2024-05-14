import React from "react";
import { Header } from "./Header";
import Footer from "../../components/footer/footer";
import Categorie from "../../components/Categorie/Categorie";
import Card from "../../components/Card/Card";

export default function Accueil() {
  return (
    <div className="h-full">
      <Header />
      <main>
        <div className="bg-white flex flex-col justify-center items-center h-400 p-10">
          <img
            src="./img/cover/cover.jpg"
            alt=""
            className=" inset-0 object-cover"
            style={{ width: "300px" }}
          />
          <h1 className="text-5xl font-bold text-black text-center mt-20">
            Bienvenue sur notre site d'e-commerce
          </h1>
          <div className="mt-10">
            <button className="bg-black font-bold text-white w-30 p-10 rounded-full animate-bounce">
              Acheter
            </button>
          </div>
        </div>
      </main>
      <section className="bg-black shadow-md" style={{ height: "400px" }}>
        <h1 className="text-3xl text-white font-bold text-center p-10">
          CATEGORIES D'APPAREILS ELECTRONIQUES
        </h1>
        <Categorie />
      </section>
      <section className="bg-white" style={{ height: "700px" }}>
        <h1 className="text-3xl font-bold text-center p-10">
          LISTES DES PRODUITS RECENTS DISPONIBLES
        </h1>
        <div className="ml-10 mt-10 flex flex-row">
          <Card />
        </div>
        <div className="flex items-center justify-center group-hover:opacity-100 mt-10">
          <button
            type="button"
            className="text-sm text-white font-semibold bg-black hover:bg-opacity-75 px-4 py-2 rounded"
          >
            Voir plus
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
