import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Transactions from "./pages/Transactions";
import TransactionsForm from "./pages/TransactionsForm";
import Tree from "./pages/Tree";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Transactions" element={<Transactions />} />
        <Route path="/TransactionsForm" element={<TransactionsForm />} />
        <Route path="/Layers" element={<Tree />} />
      </Routes>
    </Router>
  );
}
export default App;
