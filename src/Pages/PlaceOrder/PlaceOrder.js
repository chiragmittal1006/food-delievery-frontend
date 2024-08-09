import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { storeContext } from "../../Context/StoreContext";
import axios from "axios";

function PlaceOrder() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [street, setstreet] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [country, setcountry] = useState("");
  const [phone, setphone] = useState("");

  const { totalPrice } = useContext(storeContext);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/customer/add-customer`,
        {
          firstname,
          lastname,
          email,
          street,
          city,
          state,
          pincode,
          country,
          phone,
        },
        {
          withCredentials: true, // Include this option if required
        }
      );
      alert("your order has been placed...Thankyou🙏🏻")
      window.location.replace("/");
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("you are not logged In")
      window.location.replace("/");
      console.error("Error:", error.response.data);

    }
  };

  return (
    <div className="place">
      <form className="place-order-form" onSubmit={HandleSubmit}>
        <div className="place-left">
          <h1>Delievery Information</h1>
          <div className="place-left-name">
            <input
              required
              type="text"
              placeholder="First name"
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
            />
            <input
              required
              type="text"
              placeholder="last name"
              onChange={(e) => {
                setlastname(e.target.value);
              }}
            />
          </div>
          <div className="place-left-full">
            <input
              required
              type="email"
              placeholder="Email address"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </div>
          <div className="place-left-full">
            <input
              required
              type="text"
              placeholder="Street"
              onChange={(e) => {
                setstreet(e.target.value);
              }}
            />
          </div>
          <div className="place-left-name">
            <input
              required
              type="text"
              placeholder="City"
              onChange={(e) => {
                setcity(e.target.value);
              }}
            />
            <input
              required
              type="text"
              placeholder="State"
              onChange={(e) => {
                setstate(e.target.value);
              }}
            />
          </div>
          <div className="place-left-name">
            <input
              required
              type="number"
              placeholder="Pincode"
              onChange={(e) => {
                setpincode(e.target.value);
              }}
            />
            <input
              required
              type="text"
              placeholder="Country"
              onChange={(e) => {
                setcountry(e.target.value);
              }}
            />
          </div>
          <div className="place-left-full">
            <input
              required
              type="number"
              placeholder="Phone Number"
              onChange={(e) => {
                setphone(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="cart2-left">
          <h2>Cart Totals</h2>
          <hr />
          <div className="cart2-left-subtotal">
            <p>Subtotal</p>
            <p>${totalPrice}</p>
          </div>
          <hr />
          <div className="cart2-left-delievery">
            <p>Delievery Fee</p>
            <p>$2</p>
          </div>
          <hr />
          <div className="cart2-left-subtotal">
            <h4>Total</h4>
            <h4>${totalPrice + 2}</h4>
          </div>
          <button type="submit">Proceed to checkout</button>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;
