import React, { useState } from "react";
import "./PurchaseModal.css";

const PurchaseModal = ({ setIsModalOpen, item }) => {
  const [purchase, setPurchase] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const postPurchase = () => {
    var requestOptions = {
      method: "POST",
      body: JSON.stringify({
        itemId: `${item.id}`,
        itemName: `${item.name}`,
        itemPrice: `${item.price}`,
        quantity: `${purchase.quantity}`,
      }),
    };

    fetch("http://localhost:3030/purchases", requestOptions)
      .then((response) => response.json())
      .then(() => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setIsModalOpen(false);
        }, 2000); // Show toast for 2 seconds, then close modal
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      {showToast && (
        <div className="toast-banner">Purchase successful!</div>
      )}
      <div className="darkBG" onClick={() => setIsModalOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Purchase {item.name}</h5>
          </div>
          <button
            className="closeBtn"
            style={{ marginBottom: "-3px" }}
            onClick={() => setIsModalOpen(false)}
          >
            ❌
          </button>
          <form className="modalContent">
            <label>
              Enter quantity of {item.name} to buy:
              <input
                className="inputField"
                type="text"
                onChange={(e) => {
                  setPurchase({ quantity: e.target.value });
                }}
              />
            </label>
          </form>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="submitBtn" type="button" onClick={postPurchase}>
                Submit
              </button>
              <button
                className="cancelBtn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseModal;
