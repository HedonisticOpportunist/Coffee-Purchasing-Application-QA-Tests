import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";
import "./Transactions.css";
import TransactionsModal from "../components/TransactionsModal";
import z from "../tools/tools";

function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const getData = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/transactions", requestOptions)
      .then((response) => z().then(() => response.json()))
      .then((result) => setTransactions(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div>
        <Header />
      </div>
      <h1>
        <button className="primaryBtn" onClick={() => setIsModalOpen(true)}>
          Add a transaction
        </button>
      </h1>
      <div>
        {isModalOpen && <TransactionsModal setIsModalOpen={setIsModalOpen} />}
      </div>
      <div>
        {transactions?.map((transaction) => (
          <div key={transaction.id}>{transaction.transactionValue}</div>
        ))}
      </div>
    </>
  );
}

export default Transactions;
