import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="headerLogo">
        <img src="./src/assets/cat1.png" alt="Blog Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/Reports">Reports</a>
          </li>
          <li>
            <a href="/Transactions">Transactions</a>
          </li>
          <li>
            <a href="/TransactionsForm">Transactions Form</a>
          </li>
          <li>
            <a href="/TransactionsForm">Details</a>
          </li>
          <li>
            <a href="/Layers">Layers</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
