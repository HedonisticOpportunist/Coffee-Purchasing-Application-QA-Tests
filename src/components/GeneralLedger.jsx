import React from "react";

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

export default GeneralLedger;
