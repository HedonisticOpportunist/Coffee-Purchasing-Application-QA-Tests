import React, { useState } from "react";
import Header from "../components/Header";
import "../App.css";
import "./ContactForm.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    pet: "",
    agree: false,
  });

  const [error, setError] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const postContact = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    fetch("http://localhost:3030/contacts", requestOptions)
      .then((response) => response.json())
      .then(() => {
        setFormData({
          firstName: "",
          lastName: "",
          address1: "",
          address2: "",
          address3: "",
          address4: "",
          pet: "",
          agree: false,
        });
        setShowThankYou(true);
      })
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.agree
    ) {
      setError(
        "First Name, Last Name are required and you must agree to Terms of Service."
      );
      return;
    }
    setError("");
    postContact();
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container">
        <div className="form-box">
          <form className="form" onSubmit={handleSubmit}>
            {error && (
              <div style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>{error}</div>
            )}
            <label className="label">
              First Name:
              <input
                className="input"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              Last Name:
              <input
                className="input"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              Address Line 1:
              <input
                className="input"
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              Address Line 2:
              <input
                className="input"
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              Address Line 3:
              <input
                className="input"
                type="text"
                name="address3"
                value={formData.address3}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              Address Line 4:
              <input
                className="input"
                type="text"
                name="address4"
                value={formData.address4}
                onChange={handleChange}
              />
            </label>
            <span className="label" style={{ marginBottom: "8px" }}>Choose a pet:</span>
            <div className="radio-group">
              <label className="radio-label" htmlFor="cat">
                Cat
                <input
                  className="input"
                  type="radio"
                  name="pet"
                  value="cat"
                  id="cat"
                  checked={formData.pet === "cat"}
                  onChange={handleChange}
                  style={{ width: "auto", marginLeft: "8px" }}
                />
              </label>
              <label className="radio-label" htmlFor="dog">
                Dog
                <input
                  className="input"
                  type="radio"
                  name="pet"
                  value="dog"
                  id="dog"
                  checked={formData.pet === "dog"}
                  onChange={handleChange}
                  style={{ width: "auto", marginLeft: "8px" }}
                />
              </label>
              <label className="radio-label" htmlFor="rabbit">
                Rabbit
                <input
                  className="input"
                  type="radio"
                  name="pet"
                  value="rabbit"
                  id="rabbit"
                  checked={formData.pet === "rabbit"}
                  onChange={handleChange}
                  style={{ width: "auto", marginLeft: "8px" }}
                />
              </label>
            </div>
            <label className="checkbox-label" htmlFor="checkbox">
              <input
                className="input"
                type="checkbox"
                id="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                style={{ width: "auto", marginRight: "8px" }}
              />
              I agree to Terms of Service
            </label>
            <button className="input" type="submit" style={{ marginTop: "16px", width: "60%" }}>
              Submit
            </button>
          </form>
        </div>
        {showThankYou && (
          <div className="thank-you-popup">
            <div className="popup-content">
              <p>Thank you for your submission!</p>
              <button className="close-btn" onClick={() => setShowThankYou(false)}>Close</button>
            </div>
            <div
              className="popup-bg"
              onClick={() => setShowThankYou(false)}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ContactForm;
