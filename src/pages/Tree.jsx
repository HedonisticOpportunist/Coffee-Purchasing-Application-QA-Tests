import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";
import "./TransactionsForm.css";
import Root from "../components/root";
import Leaf from "../components/leaf";
import Layer from "../components/layer";

function Tree() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <div>
          <p>test</p>
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

export default Tree;
