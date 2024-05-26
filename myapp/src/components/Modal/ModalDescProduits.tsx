import axios from "axios";
import React, { useEffect, useState } from "react";

interface ModalDescProduit {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
}

interface Product {
  id: number;
  name: string;
  description: string;
  photoName: string;
  price: number;
  isAvailable: boolean;
}

const ModalForm: React.FC<ModalDescProduit> = ({ isOpen, handleOpen }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:8000/api/products");
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="flex flex-row bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 m-10">
                <div className="w-1/2 h-500 mr-10">
                  <img
                    src={`./img/product/${products[0]?.photoName}`}
                    alt="Nom du produit"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-1/2">
                  <h2 className="text-xl font-bold mb-5">
                    {products[0]?.name}
                  </h2>
                  <p className="text-black font-bold mb-5">
                    {products[0]?.price} F CFA
                  </p>
                  <p className="text-green-600 mb-2">
                    {products[0]?.isAvailable ? "Disponible" : "Pas disponible"}
                  </p>
                  <div className="flex mb-2">
                    <span>☆</span>
                    <span>☆</span>
                    <span>☆</span>
                    <span>☆</span>
                    <span>☆</span>
                  </div>
                  <h2 className="text-black font-bold mb-2">
                    Description du produit
                  </h2>
                  <p>{products[0]?.description}</p>
                  <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mt-10" onClick={() => {handleOpen(false);}}>
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalForm;
