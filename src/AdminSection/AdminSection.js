import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import "./AdminSection.css"
import axios from 'axios';

function AdminSection() {

    const fetchingAllFoodList = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/v1/product/all-products");
          setfood(response.data.data);
        } catch (error) {
          console.error("Error fetching food list:", error);
          // Optionally, handle error state or display error message to the user
        }
      };
    
      useEffect(()=>{fetchingAllFoodList()},[])

    const RemoveProduct = async (id) => {
        try {
            await axios.delete("http://localhost:8000/api/v1/product/delete-product", {
                data: { productId: id },
                withCredentials: true
            });
            fetchingAllFoodList();
        } catch (error) {
            console.error("Error removing product:", error);
        }
    }

    const [food, setfood] = useState([])

  return (
    <div>
      <div className="AdminSection">
      <div className="AdminSection-1">
        <ul>
          <li>Items</li>
          <li>Title</li>
          <li>Prices</li>
          <li>Category</li>
          <li>Remove</li>
        </ul>
        <hr />
        <div className="AdminSection-display">
          {food.map((e, index) => {
              return (
                <div key={index}>
                  <div className="AdminSectionItemDetails">
                    <div id="AdminSection-image1">
                      <img src={e.image} alt="" />
                    </div>
                    <p>{e.name}</p>
                    <p>${e.price}</p>
                    <p>{e.category}</p>
                    <div id="AdminSection-image2">
                      <img
                        src={assets.cross_icon}
                        alt="" onClick={()=>{RemoveProduct(e.productId)}} />
                    </div>
                  </div>
                  <hr />
                </div>
              );})}
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminSection
