import axios from "axios";
import React, { useState } from "react";

// l'interface ici est propre à react Typescript et permet
// de spécifier la structure des données du formulaire
interface RegisterFormData {
  firstname: string;
  lastname: string;
  identifiant: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  // ici j'ai fait l'initialisation des valeurs vides du formulaire
  const [formData, setFormData] = useState<RegisterFormData>({
    firstname: "",
    lastname: "",
    identifiant: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ici il y a la fonction pour gérer la liaison entre le front et le back.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const dataToSend = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      login: formData.identifiant,
      email: formData.email,
      password: { first: formData.password, second: formData.confirmPassword },
    };

    axios
      .post("http://localhost:8000/api/register", dataToSend)
      .then((response) => {
        alert("Registration success:");
        window.location.href = "./Login";
      })
      .catch((error) => {
        if (error.response) {
          console.error("Login failed:", error.response);
          const errorMessage = "Erreur: " + error.response.data.message;
          alert(errorMessage);
        } else if (error.request) {
          console.error("Login failed:", error.request);
          const errorMessage =
            "Erreur: La requête a été faite mais aucune réponse n'a été reçue.";
          alert(errorMessage);
        } else {
          console.error("Login failed:", error.message);
          const errorMessage = "Erreur: " + error.message;
          alert(errorMessage);
        }
      });
  };

  return (
    <div
      className="bg-[#FBFCFA]"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="flex flex-row">
        <div
          className="shadow-xl border-inherit"
          style={{ width: 500, height: 800 }}
        >
          <h1 className="text-center m-10 font-bold text-3xl">INSCRIPTION</h1>
          <form
            action=""
            className="w-full max-w-md mx-auto p-5 rounded shadow-lg"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm text-gray-800"
              >
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={(e) =>
                  setFormData({ ...formData, firstname: e.target.value })
                }
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm text-gray-800"
              >
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={(e) =>
                  setFormData({ ...formData, lastname: e.target.value })
                }
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="identifiant"
                className="block mb-2 text-sm text-gray-800"
              >
                Identifiant
              </label>
              <input
                type="text"
                id="identifiant"
                name="identifiant"
                value={formData.identifiant}
                onChange={(e) =>
                  setFormData({ ...formData, identifiant: e.target.value })
                }
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm text-gray-800"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-white bg-black rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                S'inscrire
              </button>
            </div>
            <div className="ml-4 flex justify-center mt-6">
              <p className="text-sm text-gray-800">
                Avez-vous déjà un compte ?{" "}
                <a href="./Login" className="text-blue-600 hover:underline">
                  Se connecter
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
