import React from "react";
import ButtonEdit from "../Buttons/ButtonEdit";
import ButtonDelete from "../Buttons/ButtonDelete";

export interface Transaction {
  id: number;
  mode: string;
  statut: string;
  date: Date;
  Montant: number;
}

const TableRow: React.FC<{ transactions: Transaction }> = ({
  transactions,
}) => {
  const formattedDate = transactions.date.toLocaleDateString();
  let statutClassName = "";


  switch (transactions.statut) {
    case "payé":
      statutClassName = "bg-green-500";
      break;
    case "en cours":
      statutClassName = "bg-yellow-500";
      break;
    case "échoué":
      statutClassName = "bg-red-500";
      break;
    default:
      statutClassName = "";
      break;
  }
  return (
    <tr className="hover:bg-gray-300">
      <td className="px-6 py-4">{transactions.id}</td>
      <td className="px-6 py-4">{transactions.mode}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-md ${statutClassName}`}>
          {transactions.statut}
        </span>
      </td>
      <td className="px-6 py-4">{formattedDate}</td>
      <td className="px-6 py-4">{transactions.Montant}</td>
      <td className="px-6 py-4 flex flex-row">
        <span className="mr-10">
          <ButtonEdit />
        </span>
        <span>
          <ButtonDelete />
        </span>
      </td>
    </tr>
  );
};

export default TableRow;
