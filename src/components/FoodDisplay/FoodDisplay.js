import React, { useContext } from "react";
import "./FoodDisplay.css";
import { storeContext } from "../../Context/StoreContext";
import Fooditem from "../Fooditem/Fooditem";

function FoodDisplay({ category }) {
  const { food } = useContext(storeContext);

  const result = food.filter((item) => item.category === category);

  const skeletonItems = Array(4).fill(null);

  return (
    <div className="food-display" id="food-display">
      <hr style={{ marginBottom: "1vw" }} />
      <h2>Top Dishes near you</h2>
      {food.length === 0 && (
        <div className="food-display-section">
          {skeletonItems.map((_, index) => (
            <div key={index} className="fooditem-skeleton">
              <div className="fooditem-image-skeleton skeleton"></div>
              <div className="fooditem-name-skeleton skeleton"></div>
              <div className="fooditem-rating-skeleton skeleton"></div>
              <div className="fooditem-description-skeleton skeleton"></div>
              <div className="fooditem-price-skeleton skeleton"></div>
            </div>
          ))}
        </div>
      )}
      {food.length > 0 && (
        <div className="food-display-section">
          {result.length === 0
            ? food.map((item) => {
                return (
                  <Fooditem
                    key={item.productId}
                    id={item.productId}
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                  />
                );
              })
            : result.map((item) => {
                return (
                  <Fooditem
                    key={item.productId}
                    id={item.productId}
                    image={item.image}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                  />
                );
              })}
        </div>
      )}
    </div>
  );
}

export default FoodDisplay;
