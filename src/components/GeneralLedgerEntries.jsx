import React from "react";

const GeneralLedgerEntries = (props) => {
  return (
    <div>
      <h3>
        {props.date}
        {props.value}
      </h3>
    </div>
  );
};

export default GeneralLedgerEntries;
