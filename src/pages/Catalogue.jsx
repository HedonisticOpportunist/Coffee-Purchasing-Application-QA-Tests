import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";
import "./Catalogue.css";

function Catalogue() {
  const [catalogue, setCatalogue] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Add this line

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

  const postPurchase = () => {
    if (!selectedItem || !quantity) return;
    var requestOptions = {
      method: "POST",
      body: JSON.stringify({
        itemId: `${selectedItem.id}`,
        itemName: `${selectedItem.name}`,
        itemPrice: `${selectedItem.price}`,
        quantity: `${quantity}`,
      }),
    };

    fetch("http://localhost:3030/purchases", requestOptions)
      .then((response) => response.json())
      .then(() => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setSelectedItem(null);
          setQuantity("");
        }, 2000);
      })
      .catch((error) => console.log("error", error));
  };

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
            setQuantity("");
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowConfirmModal(true); // Show confirmation modal
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label style={{ marginBottom: "1rem" }}>
              Enter quantity of {selectedItem.name} to buy:
              <input
                className="inputField"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </label>
            <div style={{ marginTop: "1rem" }}>
              <button className="submitBtn" type="submit">
                Purchase for {selectedItem.price}
              </button>
              <button
                className="cancelBtn"
                type="button"
                style={{ marginLeft: "1rem" }}
                onClick={() => {
                  setSelectedItem(null);
                  setQuantity("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              minWidth: "300px",
              textAlign: "center",
            }}
          >
            <h3>Confirm Purchase</h3>
            <p>
              Are you sure you want to purchase {quantity} of{" "}
              {selectedItem?.name} for {selectedItem?.price} each?
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <button
                className="submitBtn"
                onClick={() => {
                  setShowConfirmModal(false);
                  postPurchase();
                }}
                style={{ marginRight: "1rem" }}
              >
                Confirm
              </button>
              <button
                className="cancelBtn"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="toast-banner" style={{ margin: "2rem" }}>
          Purchase successful!
        </div>
      )}
    </>
  );
}

export default Catalogue;
