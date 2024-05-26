import axios from "axios";
import React, { useEffect, useState } from "react";

interface UserProps {
  id: number;
  login: string;
  firstname: string;
  lastname: string;
  email: string;
}

const Profil: React.FC = () => {
  const [user, setUser] = useState<UserProps | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = localStorage.getItem('authUser');
      try {
        if (!authUser) {
          throw new Error("User not authenticated");
        }
        console.log(authUser);
        const headers = {
          Authorization: `Bearer ${authUser}`,
        };
        const response = await axios.get("https://localhost:8000/api/api/users", { headers });
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur:",
          error
        );
      }
    };

    fetchUser();
  });

  if (!user) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <div className="flex items-center justify-center relative w-1/2">
        <img
          src={"default-profile-image-url"}
          // alt={`profile`}
          className="rounded-full w-32 h-32 object-cover mx-auto border-2 border-black"
        />
        <div className="absolute -top-16 left-1/2 transform translate-x-[-50%] text-white text-2xl">
          Profil
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 mt-8">
        <h2 className="text-3xl font-semibold">Informations de l'utilisateur</h2>
        <div className="flex flex-col items-center justify-center w-full mt-4">
          <p className="text-lg">
            <strong>Nom:</strong> {user.firstname}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-lg">
            <strong>Identifiant:</strong> {user.login}
          </p>
        </div>
        <div className="mt-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Modifier les informations
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profil;

