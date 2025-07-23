import React from "react";
import Header from "../components/Header";
import "../App.css";
import Root from "../components/root";
import Leaf from "../components/leaf";
import Layer from "../components/layer";

function InventoryList() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <div>
          <p>Displays purchased inventory items as a list</p>
        </div>
      </div>
      <Root>
        <Leaf>
          <Leaf></Leaf>
        </Leaf>
      </Root>
    </>
  );
}

export default InventoryList;
