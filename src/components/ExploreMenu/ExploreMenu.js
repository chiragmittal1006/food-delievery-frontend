import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

function ExploreMenu({category , setcategory}) {
  return (
    <div className="explore-menu" id="explore-menu">
      <div className="explore-menu1">
        <h1>Explore our menu</h1>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
      </div>
      <div className="explore-menu2">
        {menu_list.map((item, index) => {
          return (
            <div key={index} className="explore-menu-item" onClick={()=>setcategory(prev=> prev === item.menu_name?"All": item.menu_name)}>
              <img className={category === item.menu_name? "explore-menu-item-active" : ""} src={item.menu_image} alt="" />
              <span>{item.menu_name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExploreMenu;
