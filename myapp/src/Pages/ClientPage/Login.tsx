import axios from "axios";
import React, { useState } from "react";

// l'interface ici est propre à react Typescript et permet
// de spécifier la structure des données du formulaire
interface LoginFormData {
  email: string;
  password: string;
}

// ici j'ai fait l'initialisation des valeurs vides du formulaire
export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:8000/api/login", formData);
      if (response.data.token) {
        localStorage.setItem("authUser", response.data.token);
        alert("Login success");
        console.log("Login success:", response.data);
        if (formData.password === "admin") {
          window.location.href = "/Dashboard";
        } else {
          window.location.href = "/";
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Gérer les erreurs Axios
        if (error.response) {
          const errorMessage = "Erreur: " + (error.response.data.message || "Erreur inconnue.");
          alert(errorMessage);
          console.error("Login failed:", error.response);
        } else if (error.request) {
          const errorMessage = "Erreur: La requête a été faite mais aucune réponse n'a été reçue.";
          alert(errorMessage);
          console.error("Login failed:", error.request);
        } else {
          const errorMessage = "Erreur: " + (error.message || "Erreur inconnue.");
          alert(errorMessage);
          console.error("Login failed:", error.message);
        }
      } else {
        // Gérer d'autres types d'erreurs
        const errorMessage = "Erreur inconnue.";
        alert(errorMessage);
        console.error("Login failed:", error);
      }
    }
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
          style={{ width: 500, height: 400 }}
        >
          <h1 className="text-center m-10 font-bold text-3xl">CONNEXION</h1>
          <form
            action=""
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto p-5 rounded shadow-lg"
          >
            <div className="mb-4">
              <label
                htmlFor="identifiant"
                className="block mb-2 text-sm text-gray-800"
              >
                Email
              </label>
              <input
                type="text"
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
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-white bg-black rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Se connecter{" "}
              </button>
            </div>
            <div className="ml-4 flex justify-center mt-6">
              <p className="text-sm text-gray-800">
                Vous n'avez pas de compte ?{" "}
                <a href="./Register" className="text-blue-600 hover:underline">
                  Créez en ici.
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
