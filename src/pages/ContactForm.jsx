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
        <div className="description-box">
          <h2>Contact Us</h2>
          <p>
            We'd love to hear from you! Whether you have an inquiry about our
            coffee, equipment, or anything else, simply fill out the form below
            and we'll get back to you soon.
          </p>
        </div>
        <div className="form-box">
          <form className="form" onSubmit={handleSubmit}>
            {error && (
              <div
                style={{
                  color: "red",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
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
            <span className="label" style={{ marginBottom: "8px" }}>
              Do you have a pet? We are a pet friendly coffee shop!
            </span>
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
                />
              </label>
              <label className="radio-label" htmlFor="other">
                Other
                <input
                  className="input"
                  type="radio"
                  name="pet"
                  value="other"
                  id="other"
                  checked={formData.pet === "other"}
                  onChange={handleChange}
                />
              </label>
              <label className="radio-label" htmlFor="noPet">
                No Pet
                <input
                  className="input"
                  type="radio"
                  name="pet"
                  value="noPet"
                  id="noPet"
                  checked={formData.pet === "noPet"}
                  onChange={handleChange}
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
              I agree to
              <span className="tooltip-container">
                Terms of Service
                <span className="tooltip-text">
                  Welcome to QA Tech Test Coffee Shop! By using our website, you
                  agree to these Terms of Service. We are pet-friendly, but
                  owners are responsible for their pets' behavior. Purchases of
                  coffee equipment are subject to our return policy, and we are
                  not liable for damages from website use. All content is our
                  intellectual property, and these terms are governed by law. We
                  may update these terms; continued use implies acceptance.
                </span>
              </span>
            </label>
            <button
              className="input"
              type="submit"
              style={{ marginTop: "16px", width: "60%" }}
            >
              Submit
            </button>
          </form>
        </div>
        {showThankYou && (
          <div className="thank-you-popup">
            <div className="popup-content">
              <p>Thank you for your submission!</p>
              <button
                className="close-btn"
                onClick={() => setShowThankYou(false)}
              >
                Close
              </button>
            </div>
            <div className="popup-bg" onClick={() => setShowThankYou(false)} />
          </div>
        )}
      </div>
    </>
  );
}

export default ContactForm;
