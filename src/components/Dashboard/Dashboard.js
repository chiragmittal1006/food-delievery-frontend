import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { storeContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";

function Dashboard() {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [image, setimage] = useState("");
  const [customer, setcustormer] = useState([]);
  const [loader, setloader] = useState(false)

  const { food } = useContext(storeContext);
  // console.log(food)

  const handleImageChange = (e) => {
    // Access the file from the file input
    const file = e.target.files[0];
    setimage(file);
  };

  const HandleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append form data to the FormData object
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image); // Assuming image is a File object obtained from the file input
    try {
      // Send the form data to the backend
      await axios.post(
        "http://localhost:8000/api/v1/product/add-product",
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data for file uploads
          },
        }
      );
      alert("product has been added");
      window.location.replace("/");
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isAdmin")
      alert("you are not logged In");
      window.location.replace("/");
      console.error("Error submitting form:", error);
    }
  };

  const showAllCustomer = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/customer/get-all-customer",
      { withCredentials: true }
    );

    setcustormer(response.data.data); // response.data.data[0].cart gives the productId of all the ordered products
  };

  const RemoveCustomer = async (id) => {
    try {
        await axios.delete("http://localhost:8000/api/v1/customer/remove-customer", {
            data: { customerId: id },
            withCredentials: true
        });
        showAllCustomer();
    } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("isAdmin");
        alert("You are not logged in");
        window.location.replace("/");
        console.error("Error removing customer:", error);
    }
}

  useEffect(() => {
    showAllCustomer();
  }, []); // Empty dependency array to run once on component mount

  return (
    <div style={{ padding: "0px 3vw" }}>
      <form onSubmit={(e) => {HandleFormSubmit(e) ; setloader(true)}} className="dashboard-form">
        <input
          required
          type="text"
          name="name"
          placeholder="name"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          required
          type="text"
          name="name"
          placeholder="description"
          onChange={(e) => setdescription(e.target.value)}
        />
        <input
          required
          type="number"
          name="name"
          placeholder="price"
          onChange={(e) => setprice(e.target.value)}
        />
        <select
          name="category"
          onChange={(e) => setcategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="Salad">Salad</option>
          <option value="Rolls">Rolls</option>
          <option value="Deserts">Deserts</option>
          <option value="Sandwich">Sandwich</option>
          <option value="Cake">Cake</option>
          <option value="Pure Veg">Pure Veg</option>
          <option value="Pasta">Pasta</option>
          <option value="Noodles">Noodles</option>
        </select>
        <input
          required
          type="file"
          name="name"
          placeholder="image"
          onChange={handleImageChange}
          className="dashboard-image"
        />
        {loader === false ?<button type="submit">Submit</button> : <></>}
      </form>


      <h1 id="dashboard-h1">Orders</h1>
      <hr />
      {customer.map((e, index) => (
        <div key={index} >
        <div className="dashboard-customer">
          <div className="dashboard-customer-1">
            {e.firstname} {e.lastname},<br /> {e.email},<br /> {e.phone},<br /> {e.state},<br /> {e.street},<br /> {e.city},<br /> {e.pincode},<br /> {e.country}
          </div>
          <div className="dashboard-customer-2">
            {food.map((elem) => {
              return (
                e.cart &&
                typeof e.cart === "object" && (
                  <div key={elem.productId}>
                    {Object.entries(e.cart).map(([productId, quantity]) => {
                      if (
                        parseInt(elem.productId) === parseInt(productId) &&
                        quantity > 0
                      ) {
                        return (
                          <div key={productId}>
                            {elem.name} : {quantity}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )
              );
            })}
          </div>
          <img src={assets.cross_icon} alt="" onClick={()=>{RemoveCustomer(e._id)}}/>
        </div>
        <hr />
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
