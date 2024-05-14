import React from "react";

interface CategorieProps {
  image: string;
  title: string;
}

const CategorieItem: React.FC<CategorieProps> = ({ image, title }) => {
  return (
    <div
      className="box-content h-32 w-32 p-20 hover:bg-gray-100 border-4 ml-5 mr-10 shadow-2xl rounded-3xl bg-no-repeat bg-white flex justify-center items-center"
      style={{
        backgroundImage: `url(${image})`,
        height: "50px",
        width: "50px",
        backgroundPosition: "center",
      }}
    >
      <span className="text-xl font-bold mt-40">{title}</span>{" "}
    </div>
  );
};

const Categorie: React.FC = () => {
  const categories = [
    { image: "./img/categorie/categ-tel.png", title: "SMARTPHONE" },
    {
      image: "./img/categorie/categ-ordi.png",
      title: "ORDINATEUR",
    },
    { image: "./img/categorie/categ-tablette.png", title: "TABLETTE" },
    {
      image: "./img/categorie/categ-appareil-photo.png",
      title: "APPAREIL PHOTO",
    },
    { image: "./img/categorie/categ-casque.png", title: "CASQUE" },
  ];

  return (
    <div className="flex flex-row justify-between">
      {" "}
      {categories.map((category, index) => (
        <CategorieItem
          key={index}
          image={category.image}
          title={category.title}
        />
      ))}
    </div>
  );
};

export default Categorie;
