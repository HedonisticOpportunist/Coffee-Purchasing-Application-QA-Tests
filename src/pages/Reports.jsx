import React, {useState} from "react";
import Header from "../components/Header";
import '../App.css'
import './Reports.css'
import JournalEntries from "../components/JournalEntries";
import GeneralLedger from "../components/GeneralLedger";



function Reports() {
  const [journalEntries, setJournalEntries] = useState(true);
  const [generalLedger, setGeneralLedger] = useState(false);

  function reportsTabbing(journalEntriesState, generalLedgerState){
    setJournalEntries(journalEntriesState)
    setGeneralLedger(generalLedgerState)
  }
  return (
    <>
      <div>
        <Header />
      </div>
      <h1>
        <button onClick={() => reportsTabbing(true, false)}>
        Journal Entries
        </button>
        <button onClick={() => reportsTabbing(false, true)}>
        General Ledger
        </button>
      </h1>
      <div>
        {journalEntries? <JournalEntries />: null}
      </div>
      <div>
        {generalLedger? <GeneralLedger />: null}
      </div>
      <div>
      </div>
    </>
  )
}

export default Reports
