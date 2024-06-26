import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const  StoreContext = createContext(null)

const StoreContextProvider = (props)=>{
   
    const[food_list,setFood_list] = useState([])
    const [cartItems,setCartItems]=useState({})
    const url = "http://localhost:4000"
    const [token, setToken] = useState("")

    const addToCart=async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removeFromCart=async(itemId)=>{ 
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
            if(token){
                await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
            }
    }

    const getTotalCartAmmount = ()=>{
        let totalAmmount = 0;
        for(const item in cartItems){
           if(cartItems[item]>0){
            let itemInfo = food_list.find((product)=>product._id === item)
            totalAmmount += itemInfo.price * cartItems[item]
           }
        }
        return totalAmmount
    }
   //fetch all food items
   
    const fetchFoodList = async()=>{
        const res = await axios.get(url+"/api/food/list")
        setFood_list(res.data.data)
    }
    
    const localCartData = async(token)=>{
        const res = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(res.data.cardData)
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await localCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])

    const constextValve = {

        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmmount,
        url,
        token,
        setToken
    }
    return(
        <StoreContext.Provider value={constextValve}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider