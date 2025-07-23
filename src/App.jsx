import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Catalogue from "./pages/Catalogue";
import ContactForm from "./pages/ContactForm";
import Inventory from "./pages/Inventory";
import InventoryList from "./pages/InventoryList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Catalogue" element={<Catalogue />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/InventoryList" element={<InventoryList />} />
      </Routes>
    </Router>
  );
}
export default App;
