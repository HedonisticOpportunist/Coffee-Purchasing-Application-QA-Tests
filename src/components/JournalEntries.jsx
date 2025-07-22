import React, { useState, useEffect } from "react";

const JournalEntries = () => {
  const [journalEntries, setJournalEntries] = useState([]);

  const getData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/journalEntries", requestOptions)
      .then((response) => response.json())
      .then((result) => setJournalEntries(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      key={Math.floor(Math.random() * 10000)}
      id={Math.floor(Math.random() * 10000)}
    >
      <p>Journal Entries</p>
      <table>
        <tbody>
          <tr key="journalEntriesHeadings">
            {journalEntries.headings?.map((heading) => (
              <th key={heading}>
                <span></span> {heading}
              </th>
            ))}
          </tr>
          {journalEntries.data?.map((row, i) => (
            <tr key={i}>
              <td>
                <span></span> {row[0]}
              </td>
              <td>
                <span></span> {row[1]}
              </td>
              <td>
                <span></span> {row[2]}
              </td>
              <td>
                <span></span> {row[3]}
              </td>
              <td>
                <span></span> {row[4]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JournalEntries;
