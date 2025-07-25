import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";
import "./Catalogue.css";
import PurchaseModal from "../components/PurchaseModal";
import "../App.css";
import z from "../tools/tools";
import "./Catalogue.css";

function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catalogue, setCatalogue] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const getData = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/catalogue", requestOptions)
      .then((response) => z().then(() => response.json()))
      .then((result) => setCatalogue(result))
      .catch((error) => console.log("error", error));
  };

  const getPurchases = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/purchases", requestOptions)
      .then((response) => z().then(() => response.json()))
      .then((result) => setPurchases(result))
      .catch((error) => console.log("error", error));
  };

  function matchArrays() {
    const comparisonIds = new Set(purchases.map((obj) => obj.itemId));
    return catalogue.filter((obj) => !comparisonIds.has(obj.id));
  }

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
        {isModalOpen && (
          <PurchaseModal setIsModalOpen={setIsModalOpen} item={itemSelected} />
        )}
      </div>
      <h1>List of inventory purchased</h1>
      <div className="catalogue-grid">
        {catalogue?.map((item) =>
          purchases?.map((purchasedItem) =>
            purchasedItem.itemId === item.id ? (
              <div key={item.name} className="catalogue-item">
                <button
                  key={purchasedItem.id}
                  className="primaryBtn"
                  onClick={() => {
                    setIsModalOpen(true);
                    setItemSelected(item);
                  }}
                >
                  {purchasedItem.quantity} {purchasedItem.itemName} purchased
                  for {purchasedItem.itemPrice}
                </button>
              </div>
            ) : null
          )
        )}
        {matchArrays().map((item) => (
          <div key={item.name} className="catalogue-item">
            <button
              key={item.id}
              className="primaryBtn"
              onClick={() => {
                setIsModalOpen(true);
                setItemSelected(item);
              }}
            >
              {item.name} not purchased
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Inventory;
