import { useEffect, useState } from "react";
import TableRow, { Product } from "../../components/Table/TableRowProduct";
import ModalForm from "../../components/Modal/ModalFormAjoutProduct";
import axios from "axios";


const ProductAdmin = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);


  const handleOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:8000/api/products");
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    fetchProducts();
  }, []);



  return (
    <div className="absolute inset-0 overflow-y-auto top-16">
      <h1 className="font-bold text-3xl m-20 text-center">
        LISTES DES PRODUITS
      </h1>
      <div className="bg-white ml-10 mr-10 p-5 shadow-xl rounded-xl">
        <div className="flex justify-end">
          <button
            className="bg-black text-white text-xl font-bold p-5 rounded mr-5"
            onClick={handleOpen}
          >
            Ajouter Produit
          </button>
        </div>
        <div className="overflow-hidden rounded-lg m-5 flex justify-center">
          <table className="border-collapse bg-white text-left text-sm text-gray-500 mt-10  w-full">
            <thead className="bg-black">
              <tr className="text-white">
                <th className="px-6 py-4 font-bold">Numero</th>
                <th className="px-6 py-4 font-bold">Nom Produit</th>
                <th className="px-6 py-4 font-bold">Desciption</th>
                <th className="px-6 py-4 font-bold">Photo</th>
                <th className="px-6 py-4 font-bold">Prix</th>
                <th className="px-6 py-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-500 border-t border-gray-100 text-black font-bold">
              {products.map((product) => (
                <TableRow key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalForm isOpen={modalOpen} handleOpen={setModalOpen} />
    </div>
  );
};

export default ProductAdmin;
