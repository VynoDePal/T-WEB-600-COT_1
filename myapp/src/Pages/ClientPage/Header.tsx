import React, { useState, useEffect } from "react";

import Navbar from "../../components/NavBar/Navbar";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full text-black bg-gray-100 h-15 ${
        isScrolled ? "shadow-md bg-gray-100 h-15 justify-center pb-30" : ""
      }`}
    >
      <Navbar />
    </header>
  );
};
