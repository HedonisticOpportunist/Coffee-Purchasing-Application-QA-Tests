import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";
import "./Reports.css";
import GeneralLedger from "../components/GeneralLedger";
import JournalEntries from "../components/JournalEntries";

function Reports() {
  const [journalEntriesTab, setJournalEntriesTab] = useState(true);
  const [generalLedgerTab, setGeneralLedgerTab] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [journalEntries, setJournalEntries] = useState([]);
  const [generalLedger, setGeneralLedger] = useState([]);

  const getData = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/journalEntries", requestOptions)
      .then((response) => response.json())
      .then((result) => setJournalEntries(result))
      .catch((error) => console.log("error", error));

    fetch("http://localhost:3030/generalLedger", requestOptions)
      .then((response) => response.json())
      .then((result) => setGeneralLedger(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleTabChange = (tabName) => {
    setJournalEntriesTab(tabName === "journalEntries");
    setGeneralLedgerTab(tabName === "generalLedger");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 font-sans">
      <style>
        {`
          body { font-family: 'Inter', sans-serif; }
        `}
      </style>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <Header />

        {/* Tab Buttons */}
        <div className="flex justify-center p-4 bg-gray-50 border-b border-gray-200">
          <button
            onClick={() => handleTabChange("journalEntries")}
            className={`${journalEntriesTab ? "reports-button" : ""}`}
          >
            Journal Entries
          </button>
          <button
            onClick={() => handleTabChange("generalLedger")}
            className={`
              ${generalLedgerTab ? "reports-button" : ""}`}
          >
            General Ledger
          </button>
        </div>

        <div className="p-4 bg-white border-b border-gray-200">
          <input
            type="text"
            placeholder={`Search ${
              journalEntriesTab ? "journal entries" : "general ledger"
            }...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>

        <div className="p-4">
          {journalEntriesTab && (
            <JournalEntries data={journalEntries} searchTerm={searchTerm} />
          )}
          {generalLedgerTab && (
            <GeneralLedger data={generalLedger} searchTerm={searchTerm} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
