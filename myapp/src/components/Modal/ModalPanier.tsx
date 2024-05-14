import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ModalPanierProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalPanier({ isOpen, onClose }: ModalPanierProps) {
  const [cart, setCart] = useState<Product[]>([]);

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: "1000",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "400px",
          height: "400px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2 className="text-xl font-bold mb-4">Votre Panier</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Votre panier est vide.</p>
        ) : (
          cart.map((product) => (
            <div key={product.id} className="mb-4">
              <p>{product.name}</p>
              <p>
                {product.price}€ x {product.quantity}
              </p>
              <button
                onClick={() => removeFromCart(product.id)}
                className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
              >
                Supprimer
              </button>
            </div>
          ))
        )}
        <div className="mt-4">
          <p>
            Total :{" "}
            {cart.reduce(
              (total, product) => total + product.price * product.quantity,
              0
            )}
            €
          </p>
        </div>
        <button
          onClick={onClose}
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
