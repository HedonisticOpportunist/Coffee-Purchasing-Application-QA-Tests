import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";
import "./Catalogue.css";
import PurchaseModal from "../components/PurchaseModal";

function Catalogue() {
  const [catalogue, setCatalogue] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div style={{ margin: "2rem" }}>
        <label htmlFor="catalogue-dropdown">Select an item to purchase: </label>
        <select
          id="catalogue-dropdown"
          value={selectedItem ? selectedItem.id : ""}
          onChange={(e) => {
            const item = catalogue.find((i) => i.id === e.target.value);
            setSelectedItem(item || null);
          }}
        >
          <option value="">-- Select an item --</option>
          {catalogue.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.price})
            </option>
          ))}
        </select>
      </div>

      {!selectedItem && (
        <div style={{ margin: "2rem", color: "#888" }}>
          Please select an item from the dropdown to purchase.
        </div>
      )}

      {selectedItem && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ marginTop: "1rem" }}>
              <button className="submitBtn" type="submit">
                Purchase {selectedItem.name}
              </button>
            </div>
          </form>
        </div>
      )}
      <div>
        {isModalOpen && (
          <PurchaseModal setIsModalOpen={setIsModalOpen} item={selectedItem} />
        )}
      </div>
    </>
  );
}

export default Catalogue;
