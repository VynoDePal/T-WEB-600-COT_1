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
      try {
        const response = await axios.get("https://localhost:8000/api/api/users");
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
    return <div>Loading...</div>;
  }

  return (
    <div
      className="bg-black justify-center items-center dark:bg-black text-black dark:text-white p-6 rounded-lg shadow-md absolute"
      style={{
        width: "500px",
        height: "500px",
        marginLeft: "500px",
        marginTop: "200px",
      }}
    >
      <img
        src={"default-profile-image-url"}
        alt={` profile`}
        className="rounded-full w-32 h-32 object-cover mx-auto mb-4 border-black border-2"
      />
      <h2 className="text-xl font-semibold mb-4">
        Informations de l'utilisateur
      </h2>
      <div>
        <strong>Nom:</strong> {user.firstname}
        <br />
        <strong>Email:</strong> {user.email}
        <br />
        <strong>Identifiant:</strong> {user.login}
      </div>
      <p className="mt-4">
        <strong>Mot de passe:</strong> (Cliquez ici pour modifier)
      </p>
      <button className="mt-20 ml-20 bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
        Modifier les informations
      </button>
    </div>
  );
};

export default Profil;
