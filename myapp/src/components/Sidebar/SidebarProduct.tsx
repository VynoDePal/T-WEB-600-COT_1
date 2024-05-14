import React from "react";

export default function SidebarProduct() {
  return (
    <aside className="w-1/5 h-screen bg-white text-black p-4">
      <div className="mb-8">
        <span className="text-lg font-semibold mb-4 block">Prix (FCFA)</span>
        <input
          id="labels-range-input"
          type="range"
          value="1000"
          min="100"
          max="1500"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          style={{
            width: "200px",
          }}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 w-30">Carte mère</h2>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center mb-2">
            <input type="checkbox" className="w-5 h-5 mr-2" />
            <p className="m-0">Blablabla</p>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 w-30">Carte mère</h2>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center mb-2">
            <input type="checkbox" className="w-5 h-5 mr-2" />
            <p className="m-0">Blablabla</p>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 w-30">Carte mère</h2>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center mb-2">
            <input type="checkbox" className="w-5 h-5 mr-2" />
            <p className="m-0">Blablabla</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
