import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";
import "./TransactionsForm.css";

function TransactionsForm() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="container">
        <form className="form">
          <label className="label">
            First Name:<span> </span>
            <input className="input" type="text" />
          </label>
          <label className="label">
            Last Name:<span> </span>
            <input className="input" type="text" />
          </label>
          <label className="label">
            Address Line 1:<span> </span>
            <input className="input" type="text" />
          </label>
          <label className="label">
            Address Line 2:<span> </span>
            <input className="input" type="text" />
          </label>
          <label className="label">
            Address Line 3:<span> </span>
            <input className="input" type="text" />
          </label>
          <label className="label">
            Address Line 4:<span> </span>
            <input className="input" type="text" />
          </label>
          <text className="label">Choose a pet:</text>
          <label className="label" htmlFor="cat">
            Cat
            <input
              className="input"
              type="radio"
              name="topping"
              value="cat"
              id="cat"
            />
          </label>

          <label className="label" htmlFor="dog">
            <input
              className="input"
              type="radio"
              name="topping"
              value="dog"
              id="dog"
            />
            Dog
          </label>

          <label className="label" htmlFor="rabbit">
            Rabbit
            <input
              className="input"
              type="radio"
              name="topping"
              value="rabbit"
              id="rabbit"
            />
          </label>
          <label htmlFor="checkbox">
            <input className="input" type="checkbox" id="checkbox" />I agree to
            Terms of Service{" "}
          </label>
        </form>
      </div>
    </>
  );
}

export default TransactionsForm;
