import React, { useContext } from "react";
import "./Cart.css";
import { assets } from "../../assets/assets";
import { storeContext } from "../../Context/StoreContext";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  const { cartitem, removeFromCart, totalPrice , food } = useContext(storeContext);

  const HandleCartSubmit = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/users/add-to-cart`,
        {
          cart: cartitem,
        },
        {
          withCredentials: true, // Include this option if required
        }
      );
      console.log(response.data);
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("you are not logged In")
      window.location.replace("/");
      console.error("Error:", error.response.data);
    }
  };

  return (
    <div className="cart">
      <div className="cart-1">
        <ul>
          <li>Items</li>
          <li>Title</li>
          <li>Prices</li>
          <li>Quantity</li>
          <li>Total</li>
          <li>Remove</li>
        </ul>
        <hr />
        <div className="cart-display">
          {food.map((e, index) => {
            if (cartitem[e.productId] > 0) {
              return (
                <div key={index}>
                  <div className="cartItemDetails">
                    <div id="cart-image1">
                      <img src={e.image} alt="" />
                    </div>
                    <p>{e.name}</p>
                    <p>${e.price}</p>
                    <p>{cartitem[e.productId]}</p>
                    <p>${e.price * cartitem[e.productId]}</p>
                    <div id="cart-image2">
                      <img
                        src={assets.cross_icon}
                        alt=""
                        onClick={() => {
                          removeFromCart(e.productId);
                        }}
                      />
                    </div>
                  </div>
                  <hr />
                </div>
              );
            }
            return null; // Added to handle the case when the if condition is not met
          })}
        </div>
      </div>
      <div className="cart-2">
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
          <Link to="/order">
            <button onClick={HandleCartSubmit}>Proceed to checkout</button>
          </Link>
        </div>
        <div className="cart2-right">
          <p>if you have a promo code, Enter it here</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            className="cart-last-div"
          >
            <input type="text" placeholder="Enter promo code here" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
