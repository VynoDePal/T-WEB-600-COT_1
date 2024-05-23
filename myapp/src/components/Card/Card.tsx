import React, { useEffect, useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import axios from "axios";
import ModalForm from "../Modal/ModalDescProduits";

interface Product {
  id: number;
  name: string;
  description: string;
  photoName: string;
  price: number;
  isAvailable: boolean;
}

export default function Card() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

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

  const addToCart = async (productId: number) => {
    try {
      const response = await axios.post(
        `https://localhost:8000/api/carts/${productId}`
      );
      console.log(productId);
      // if (response.status === 201) {
      //   alert("Le produit a été ajouté au panier.");
      // } else if (response.status === 401) {
      //   alert("veuillez vous connecter");
      // } else {
      //   alert("erreur");
      // }
    } catch (error: unknown) {
      alert("Une erreur inconnue s'est produite: " + String(error));
    }
  };

  return (
    <div>
      <div className="flex flex-row space-x-10">
        {products.map((product) => (
          <div key={product.id} className="">
            <div
              className="bg-white flex flex-row p-5 shadow-xl items-center transition duration-300 ease-in-out transform group-hover:shadow-md"
              style={{
                borderRadius: "20px",
                width: "250px",
                height: "250px",
              }}
            >
              <div className=" top-0 left-0 m-1">
                <MdFavoriteBorder className="w-6 h-6 text-red-500" />
              </div>
              <img
                src={`./img/product/${product.photoName}`}
                alt={product.name}
                className="w-50 h-auto mt-10 rounded-xl group-hover:opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  className="text-sm text-white font-semibold bg-black bg-opacity-50 hover:bg-opacity-75 px-4 py-2 rounded"
                  onClick={handleOpen}
                >
                  Voir plus
                </button>
              </div>
            </div>
            <div>
              <p className="font-bold text-m p-2">
                Nom :{" "}
                {products.length > 0 ? products[0].name : "Nom du produit"}
              </p>
              <p className="font-bold text-m p-2">
                Prix : {products.length > 0 ? products[0].price : "0 $"} $
              </p>

              <button
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-white bg-black rounded w-30 mb-10 mx-10 block"
                onClick={() => {
                  addToCart(product.id);
                }}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
      <ModalForm isOpen={modalOpen} handleOpen={setModalOpen} />
    </div>
  );
}
