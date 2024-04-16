import React, { useContext} from "react";
import "./Fooditem.css";
import { assets } from "../../assets/assets";
import { storeContext } from "../../Context/StoreContext";

function Fooditem({id, image, name, description, price }) {

    // const [itemcount, setitemcount] = useState(0)  we wil not use this as this is creating an item count for each fooditem and we are using cartitem state which is an object

    const {cartitem , addToCart , removeFromCart} = useContext(storeContext)

  return (
    <div className="fooditem">
      <div className="fooditem-image">
        <img src={image} alt="" />
        {!cartitem[id]? 
        <img src={assets.add_icon_white} className="food-item-counter-button" style={{height:"2rem" , width:"2rem"}} onClick={()=>addToCart(id)} alt="" />
        : <div className="food-item-counter">
            <img src={assets.remove_icon_red}  style={{height:"1.6rem" , width:"1.6rem"}}  onClick={()=>removeFromCart(id)} alt=""/>
            <span>{cartitem[id]}</span>
            <img src={assets.add_icon_green}  style={{height:"1.6rem" , width:"1.6rem"}}  onClick={()=>addToCart(id)} alt="" />
        </div>
    }
      </div>
      <div className="fooditem-name">
        <h2>{name}</h2>
        <img src={assets.rating_starts} alt="" />
      </div>
      <div className="fooditem-description">
        <p>{description}</p>
      </div>
      <div className="fooditem-price">
        <span>${price}</span>
      </div>
    </div>
  );
}

export default Fooditem;
