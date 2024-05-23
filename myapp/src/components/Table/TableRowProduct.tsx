import React from "react";
import ButtonEdit from "../Buttons/ButtonEdit";
import ButtonDelete from "../Buttons/ButtonDelete";
import axios from "axios";

export interface Product {
  id: number;
  name: string;
  description: string;
  photoName: string;
  price: string;
}

const handleUpdate = async (id: number) => {
  try {
    const response = await axios.put(
      `https://localhost:8000/api/products/${id}`
    );
    console.log(response.data);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
  }
};

const handleDelete = async (id: number) => {
  try {
    const response = await fetch(`https://localhost:8000/api/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du produit");
    }

    const data = await response.json();
    console.log(data);
    console.log(id);
    alert("Suppression réussie");
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
  }
};

const TableRow: React.FC<{ product: Product }> = ({ product }) => {
  const handleClick = (action: "edit" | "delete", id: number) => {
    if (action === "edit") {
      handleUpdate(id);
    } else if (action === "delete") {
      handleDelete(id);
    }
  };

  return (
    <tr className="hover:bg-gray-300">
      <td className="px-6 py-4">{product.id}</td>
      <td className="px-6 py-4">{product.name}</td>
      <td className="px-6 py-4">{product.description}</td>
      <td className="px-6 py-4">
        <img src={`./img/product${product.photoName}`} alt="" />
      </td>
      <td className="px-6 py-4">{product.price}</td>
      <td className="px-6 py-4 flex flex-row">
        <span className="mr-10">
          <ButtonEdit onClick={() => handleClick("edit", product.id)} />
        </span>
        <span>
          <ButtonDelete onClick={() => handleClick("delete", product.id)} />
        </span>
      </td>
    </tr>
  );
};

export default TableRow;
