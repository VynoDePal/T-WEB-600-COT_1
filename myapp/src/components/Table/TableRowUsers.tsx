import React from "react";
import ButtonEdit from "../Buttons/ButtonEdit";

export interface Users {
  id: number;
  name: String;
  role: String;
  statut: String;
}

const TableRowUsers: React.FC<{ user: Users }> = ({ user }) => {
  return (
    <tr className="hover:bg-gray-300">
      <td className="px-6 py-4">{user.id}</td>
      <td className="px-6 py-4">{user.name}</td>
      <td className="px-6 py-4">{user.role}</td>
      <td className="px-6 py-4">{user.statut}</td>
      <td className="px-6 py-4 flex flex-row">
        <span className="mr-10">
          <ButtonEdit />
        </span>
      </td>
    </tr>
  );
};

export default TableRowUsers;
