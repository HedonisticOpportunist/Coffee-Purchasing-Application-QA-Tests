import React from "react";

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

export default JournalEntries;
