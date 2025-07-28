import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";
import "./Catalogue.css";
import RemoveQuantityModal from "../components/RemoveQuantityModal";
import "../App.css";
import z from "../tools/tools";
import "./Catalogue.css";

function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catalogue, setCatalogue] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [purchasedItemSelected, setPurchasedItemSelected] = useState(null);

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

  const handleRemoveQuantity = async (removeQty) => {
    // Update backend (adjust as needed for your API)
    await fetch(`http://localhost:3030/purchases/${purchasedItemSelected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: purchasedItemSelected.quantity - removeQty,
      }),
    });
    getPurchases();
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
        {isModalOpen && purchasedItemSelected && (
          <RemoveQuantityModal
            setIsModalOpen={setIsModalOpen}
            purchasedItem={purchasedItemSelected}
            onRemove={handleRemoveQuantity}
          />
        )}
      </div>
      <h1>List of inventory purchased</h1>
      <div className="catalogue-grid">
        {catalogue?.map((item) =>
          purchases
            ?.filter((purchasedItem) => purchasedItem.quantity > 0) // Only show if quantity > 0
            .map((purchasedItem) =>
              purchasedItem.itemId === item.id ? (
                <div key={item.name} className="catalogue-item">
                  <button
                    key={purchasedItem.id}
                    className="primaryBtn"
                    onClick={() => {
                      setIsModalOpen(true);
                      setPurchasedItemSelected(purchasedItem);
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
              disabled
              title="Not purchased yet"
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
