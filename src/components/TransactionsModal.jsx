import React, { useState } from "react";
import "./TransactionsModal.css";

const TransactionsModal = ({ setIsModalOpen }) => {
  const [transaction, setTransaction] = useState([]);

  const postTransaction = () => {
    var requestOptions = {
      method: "POST",
      body: JSON.stringify({
        transactionValue: `${transaction}`,
      }),
    };

    fetch("http://localhost:3030/transactions", requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className="darkBG" onClick={() => setIsModalOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Ready to add a transaction</h5>
          </div>
          <button
            className="closeBtn"
            style={{ marginBottom: "-3px" }}
            onClick={() => setIsModalOpen(false)}
          >
            X
          </button>
          <div className="modalContent">Add an item</div>
          <form className="modalContent">
            <label>
              Enter value to submit:
              <input
                className="inputField"
                type="text"
                onChange={(e) => setTransaction(e.target.value)}
              />
            </label>
          </form>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="submitBtn" onClick={() => postTransaction()}>
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

export default TransactionsModal;
