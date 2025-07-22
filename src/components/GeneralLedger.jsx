import React, { useState, useEffect } from "react";
import GeneralLedgerEntries from "./GeneralLedgerEntries";

const GeneralLedger = () => {
    const [generalLedger, setPosts] = useState([]);
  
    const getData = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
  
      fetch("http://localhost:3030/generalLedger", requestOptions)
        .then((response) => response.json())
        .then((result) => setPosts(result))
        .catch((error) => console.log("error", error));
    };
  
    useEffect(() => {
      getData();
    }, []);

  return (
    <div key={Math.floor(Math.random() * 10000)} id={Math.floor(Math.random() * 10000)}>
      <p>General Ledger</p>
      <div>
        {Object.keys(generalLedger).map((entry) => 
          <div key={entry}>
            <p>{entry}</p>
              {Object.keys(generalLedger[entry]).map((key) => 
              <div key={key}>
                <GeneralLedgerEntries date={key} value={generalLedger[entry][key]}/>
                </div>
              )}
            </div>
        )}
        </div>
    </div>
  );
};

export default GeneralLedger;
