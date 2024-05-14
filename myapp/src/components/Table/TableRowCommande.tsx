import React from "react";

export interface Commande {
  id: number;
  totalPrice: number;
  creationDate: string;
  products: Array<{
    id: number;
    name: string;
    description: string;
    photoName: string;
    price: number;
    isAvailable: boolean;
  }>;
}

const TableRow: React.FC<{ commande: Commande }> = ({ commande }) => {
  return (
    <tr>
      <td>{commande.id}</td>
      <td>{commande.totalPrice}</td>
      <td>{new Date(commande.creationDate).toLocaleDateString()}</td>
      <td></td>
    </tr>
  );
};

export default TableRow;
