import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="headerLogo">
        <img src="./src/assets/whiteTopHat.png" alt="Blog Logo" />
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
