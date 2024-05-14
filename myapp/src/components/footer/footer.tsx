import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-black text-white w-screen p-10">
        <div className="container mx-auto text-white font-bold">
          <div className="flex flex-row justify-between mt-10">
            <div className="flex flex-col">
              <h1>Ecommerce</h1>
            </div>
            <div className="flex flex-col ml-8">
              <h1>Boutique</h1>
              <p className="mb-2">Processeur</p>
              <p className="mb-2">Boitier</p>
              <p className="mb-2">Boitier</p>
              <p>Boitier</p>
            </div>
            <div className="flex flex-col ml-8">
              <h1>Entreprise</h1>
              <p className="mb-2">A propos de nous</p>
              <p className="mb-2">Nos articles</p>
              <p>Foire aux questions</p>
            </div>
            <div className="flex flex-col ml-8">
              <h1>Support</h1>
              <p>Aide</p>
              <p>Livraison</p>
              <p>LIvraison</p>
            </div>
            <div className="flex flex-col ml-8">
              <h1>Contact</h1>
              <p className="mb-2">+229 67 60 07 42</p>
              <p className="mb-2">+229 67 60 07 42</p>
              <p>+229 67 60 07 42</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
