import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";
import "./Catalogue.css";
import PurchaseModal from "../components/PurchaseModal";

function Catalogue() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catalogue, setCatalogue] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);

  const getData = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/catalogue", requestOptions)
      .then((response) => response.json())
      .then((result) => setCatalogue(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div>
        <Header />
      </div>

      <div>
        {isModalOpen && (
          <PurchaseModal setIsModalOpen={setIsModalOpen} item={itemSelected} />
        )}
      </div>
      <div className="catalogue-grid">
        {catalogue?.map((item) => (
          <div key={item.name} className="catalogue-item">
            <h1>
              <button
                className="primaryBtn"
                onClick={() => {
                  setIsModalOpen(true);
                  setItemSelected(item);
                }}
              >
                Purchase {item.name} for {item.price}
              </button>
            </h1>
          </div>
        ))}
      </div>
    </>
  );
}

export default Catalogue;
