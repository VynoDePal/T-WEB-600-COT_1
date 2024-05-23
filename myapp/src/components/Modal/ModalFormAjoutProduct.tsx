import React, { useState } from "react";
import axios from "axios";

interface ModalFormProduit {
  isOpen: boolean;
  handleOpen: (isOpen: boolean) => void;
}

const ModalForm: React.FC<ModalFormProduit> = ({ isOpen, handleOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photoName: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:8000/api/products', formData); 
      console.log("Produit ajouté avec succès");
      handleOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h2 className="text-lg leading-6 font-bold text-gray-900">
                        AJOUTER UN PRODUIT
                      </h2>
                      <div className="mt-8">
                        <div className="mb-4">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm text-gray-800"
                          >
                            Nom du produit
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            style={{ width: "400px" }}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm text-gray-800"
                          >
                            Description
                          </label>
                          <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            style={{ width: "400px" }}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="photo"
                            className="block mb-2 text-sm text-gray-800"
                          >
                            Photo
                          </label>
                          <input
                            type="file"
                            id="photoName"
                            name="photoName"
                            accept="image/*"
                            value={formData.photoName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            style={{ width: "400px" }}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="prix"
                            className="block mb-2 text-sm text-gray-800"
                          >
                            Prix du produit
                          </label>
                          <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            style={{ width: "400px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => handleOpen(false)}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalForm;
