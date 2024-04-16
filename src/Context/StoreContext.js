import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartitem, setcartitem] = useState({})
  const [totalItem, settotalItem] = useState(0)
  const [totalPrice, settotalPrice] = useState(0)
  const [food, setfood] = useState([])


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

  const addToCart = (itemId) => {
    if(!cartitem[itemId]){
      setcartitem((prev)=>({...prev, [itemId]:1}))
    }
    else{
      setcartitem((prev)=>({...prev , [itemId]: prev[itemId]+1}))
    } 
  }

  const removeFromCart = (itemId) => {
      setcartitem((prev)=>({...prev , [itemId]: prev[itemId]-1}))
  }

  useEffect(()=>{

    const totalItems = () => {
      let total = 0;
      food_list.map((e)=>{
        if(cartitem[e.productId] > 0){
          total = total + cartitem[e.productId];
        }
        return null;
      })

      settotalItem(total)
    }
    totalItems();

  },[cartitem])

  useEffect(() => {

    const totalPrice = () => {
      let subtotal = 0
      food_list.map((e)=>{
        if(cartitem[e.productId] > 0){
          subtotal = subtotal + e.price * cartitem[e.productId]
        }
        return null;
      })

      settotalPrice(subtotal)
    }
    totalPrice();

  }, [cartitem])
  

  const contextValue = {
    food_list, cartitem , setcartitem , addToCart , removeFromCart , totalItem , totalPrice , food
  }

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
