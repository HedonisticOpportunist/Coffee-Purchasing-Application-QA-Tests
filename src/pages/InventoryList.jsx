import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";
import Root from "../components/root";
import Leaf from "../components/leaf";
import RemoveQuantityModal from "../components/RemoveQuantityModal";

function InventoryList() {
  const [catalogue, setCatalogue] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchasedItemSelected, setPurchasedItemSelected] = useState(null);

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

  const handleRemoveQuantity = async (removeQty) => {
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
        <div>
          <h1>Inventory purchased as a list</h1>
        </div>
      </div>
      {isModalOpen && purchasedItemSelected && (
        <RemoveQuantityModal
          setIsModalOpen={setIsModalOpen}
          purchasedItem={purchasedItemSelected}
          onRemove={handleRemoveQuantity}
        />
      )}
      <Root>
        <Leaf>
          <Leaf>
            <div>
              {catalogue?.map((item) =>
                purchases
                  ?.filter(
                    (purchasedItem) =>
                      purchasedItem.quantity > 0 &&
                      purchasedItem.itemId === item.id
                  )
                  .map((purchasedItem) => (
                    <Leaf key={purchasedItem.id}>
                      <button
                        className="primaryBtn"
                        onClick={() => {
                          setIsModalOpen(true);
                          setPurchasedItemSelected(purchasedItem);
                        }}
                      >
                        {purchasedItem.quantity} {purchasedItem.itemName}{" "}
                        purchased for {purchasedItem.itemPrice}
                      </button>
                    </Leaf>
                  ))
              )}
            </div>
          </Leaf>
        </Leaf>
      </Root>
    </>
  );
}

export default InventoryList;
