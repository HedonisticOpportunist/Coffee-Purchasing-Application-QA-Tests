import React from "react";
import Header from "../components/Header";
import "../App.css";
import Root from "../components/root";
import Leaf from "../components/leaf";
import Layer from "../components/layer";

function Inventory() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <div>
          <p>Displays purchased inventory items</p>
        </div>
      </div>
    </>
  );
}

export default Inventory;
