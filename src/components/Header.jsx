import React, { useEffect, useState, useRef } from "react";
import "./Header.css";

const Header = () => {
  const [easterEgg, setEasterEgg] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Easter egg key combo: Shift+C
      if (e.shiftKey && e.key.toLowerCase() === "c") {
        setEasterEgg(true);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
        // Hide easter egg after 3 seconds
        setTimeout(() => setEasterEgg(false), 3000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header>
      <div className="headerLogo">
        <img
          src={
            easterEgg ? "./src/assets/cat1.png" : "./src/assets/whiteTopHat.png"
          }
          alt="Blog Logo"
        />
        <audio ref={audioRef} src="./src/assets/meowrgh.mp3" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/Catalogue">Catalogue</a>
          </li>
          <li>
            <a href="/Inventory">Inventory</a>
          </li>
          <li>
            <a href="/InventoryList">Inventory List</a>
          </li>
          <li>
            <a href="/InventoryList">Further details</a>
          </li>
          <li>
            <a href="/Reports">Reports</a>
          </li>
          <li>
            <a href="/ContactForm">Contact Form</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
