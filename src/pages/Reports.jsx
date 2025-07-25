import React, { useState } from "react";
import Header from "../components/Header";
import database from "../data/original_db.json";
import "../App.css";

// JournalEntries Component
const JournalEntries = ({ data, searchTerm }) => {
  const filteredEntries = data.filter((entry) =>
    Object.values(entry).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-4 bg-white rounded-b-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Journal Entries</h2>
      {filteredEntries.length > 0 ? (
        <div className="overflow-x-auto flex justify-center">
          <table
            className="bg-white border border-gray-200 rounded-lg mx-auto"
            style={{ display: "inline-block" }}
          >
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left text-gray-600 font-semibold rounded-tl-lg">
                  Date
                </th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                  Description
                </th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                  Debit Account
                </th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                  Credit Account
                </th>
                <th className="py-2 px-4 text-right text-gray-600 font-semibold rounded-tr-lg">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{entry.date}</td>
                  <td className="py-2 px-4">{entry.description}</td>
                  <td className="py-2 px-4">{entry.debit}</td>
                  <td className="py-2 px-4">{entry.credit}</td>
                  <td className="py-2 px-4 text-right">
                    ${entry.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">
          No journal entries found matching your search.
        </p>
      )}
    </div>
  );
};

// GeneralLedger Component
const GeneralLedger = ({ data, searchTerm }) => {
  const filteredAccounts = data.filter(
    (account) =>
      Object.values(account).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      account.entries.some((entry) =>
        Object.values(entry).some((entryValue) =>
          String(entryValue).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
  );

  return (
    <div className="p-4 bg-white rounded-b-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">General Ledger</h2>
      {filteredAccounts.length > 0 ? (
        <div className="overflow-x-auto flex justify-center">
          <table
            className="bg-white border border-gray-200 rounded-lg mx-auto"
            style={{ display: "inline-block" }}
          >
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left text-gray-600 font-semibold rounded-tl-lg">
                  Account
                </th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                  Type
                </th>
                <th className="py-2 px-4 text-right text-gray-600 font-semibold rounded-tr-lg">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <React.Fragment key={account.id}>
                  <tr className="bg-blue-50 border-b hover:bg-blue-100">
                    <td className="py-2 px-4 font-semibold">
                      {account.account}
                    </td>
                    <td className="py-2 px-4">{account.type}</td>
                    <td className="py-2 px-4 text-right font-semibold">
                      ${account.balance.toFixed(2)}
                    </td>
                  </tr>
                  {account.entries.length > 0 && (
                    <tr>
                      <td colSpan="3" className="p-0">
                        <div className="overflow-x-auto flex justify-center">
                          <table
                            className="bg-gray-50 text-sm mx-auto"
                            style={{ display: "inline-block" }}
                          >
                            <thead>
                              <tr className="bg-gray-100 border-b">
                                <th className="py-1 px-4 text-left text-gray-600">
                                  Entry Date
                                </th>
                                <th className="py-1 px-4 text-left text-gray-600">
                                  Entry Description
                                </th>
                                <th className="py-1 px-4 text-right text-gray-600">
                                  Debit
                                </th>
                                <th className="py-1 px-4 text-right text-gray-600">
                                  Credit
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {account.entries.map((entry, idx) => (
                                <tr
                                  key={idx}
                                  className="border-b last:border-b-0 hover:bg-gray-100"
                                >
                                  <td className="py-1 px-4">{entry.date}</td>
                                  <td className="py-1 px-4">
                                    {entry.description}
                                  </td>
                                  <td className="py-1 px-4 text-right">
                                    {entry.debit > 0
                                      ? `$${entry.debit.toFixed(2)}`
                                      : "-"}
                                  </td>
                                  <td className="py-1 px-4 text-right">
                                    {entry.credit > 0
                                      ? `$${entry.credit.toFixed(2)}`
                                      : "-"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">
          No general ledger accounts found matching your search.
        </p>
      )}
    </div>
  );
};

// Main Reports Component
function Reports() {
  const [journalEntriesTab, setJournalEntriesTab] = useState(true);
  const [generalLedgerTab, setGeneralLedgerTab] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle tab switching
  const handleTabChange = (tabName) => {
    setJournalEntriesTab(tabName === "journalEntries");
    setGeneralLedgerTab(tabName === "generalLedger");
    setSearchTerm(""); // Clear search term when switching tabs
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 font-sans">
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Inter font from Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
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
            className={`px-6 py-2 mx-2 rounded-full text-lg font-medium transition-all duration-300
              ${
                journalEntriesTab
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Journal Entries
          </button>
          <button
            onClick={() => handleTabChange("generalLedger")}
            className={`px-6 py-2 mx-2 rounded-full text-lg font-medium transition-all duration-300
              ${
                generalLedgerTab
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            General Ledger
          </button>
        </div>

        {/* Search Bar */}
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

        {/* Content based on selected tab */}
        <div className="p-4">
          {journalEntriesTab && (
            <JournalEntries
              data={database.journalEntries}
              searchTerm={searchTerm}
            />
          )}
          {generalLedgerTab && (
            <GeneralLedger
              data={database.generalLedger}
              searchTerm={searchTerm}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
