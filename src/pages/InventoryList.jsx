import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";
import Root from "../components/root";
import Leaf from "../components/leaf";
import Layer from "../components/layer";

function InventoryList() {
  const [catalogue, setCatalogue] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const getData = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/catalogue", requestOptions)
      .then((response) => response.json())
      .then((result) => setCatalogue(result))
      .catch((error) => console.log("error", error));
  };

  const getPurchases = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/purchases", requestOptions)
      .then((response) => response.json())
      .then((result) => setPurchases(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
    getPurchases();
  }, []);
  return (
    <>
      <div>
        <Header />
      </div>

      <div>
        <div>
          <h1>Displays purchased inventory items as a list</h1>
        </div>
      </div>
      <Root>
        <Leaf>
          <Leaf>
            <div>
              {catalogue?.map((item) =>
                purchases?.map((purchasedItem) =>
                  purchasedItem.itemId === item.id ? (
                    <Leaf key={purchasedItem.id}>
                      <button className="primaryBtn">
                        {purchasedItem.quantity} {purchasedItem.itemName}{" "}
                        purchased for {purchasedItem.itemPrice}
                      </button>
                    </Leaf>
                  ) : null
                )
              )}
            </div>
          </Leaf>
        </Leaf>
      </Root>
    </>
  );
}

export default InventoryList;
