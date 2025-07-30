import React, { useState } from "react";
import "./RemoveQuantityModal.css";

function RemoveQuantityModal({ setIsModalOpen, purchasedItem, onRemove }) {
  const [removeQty, setRemoveQty] = useState(1);
  const [warning, setWarning] = useState("");

  const handleRemove = () => {
    if (removeQty > purchasedItem.quantity) {
      setWarning("Cannot remove more than purchased quantity.");
      return;
    }
    setWarning("");
    onRemove(removeQty);
    setIsModalOpen(false);
  };

  return (
    <div className="darkBG">
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h2 className="heading">Remove Quantity</h2>
          </div>
          <div className="modalContent">
            <p>
              {purchasedItem.quantity} {purchasedItem.itemName} purchased.
            </p>
            <input
              className="inputField"
              type="number"
              min="1"
              max={purchasedItem.quantity}
              value={removeQty}
              onChange={(e) => setRemoveQty(Number(e.target.value))}
            />
            {warning && <div className="warning">{warning}</div>}
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="submitBtn" onClick={handleRemove}>
                Remove
              </button>
              <button
                className="cancelBtnRemove"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemoveQuantityModal;
