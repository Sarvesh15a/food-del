import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './PlaceOrder.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {getTotalCartAmmount,token,food_list,cartItems,url} = useContext(StoreContext);
  const navigate = useNavigate()
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:"",
  })
  
  const onChangeHandler=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }
  
const placeOrder = async(e)=>{
  e.preventDefault();
  let orderItems = [];
  food_list.map((item)=>{
    if(cartItems[item._id]>0){
      let itemInfo = item;
      itemInfo["quantity"] = cartItems[item._id]
      orderItems.push(itemInfo)
    }
  })
  let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCartAmmount()+2,
  }
  let res = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
  if(res.data.success){
    const {session_url} = res.data;
    window.location.replace(session_url)
  }else{
    alert("Error")
  }
}

  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }
    else if(getTotalCartAmmount()===0){
      navigate("/cart")
    }
  },[token])


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
         <p className='title'>Delivery Information</p>
         <div className="multi-field">
          <input required onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Last name' />
         </div>
         <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email address' />
         <input required  onChange={onChangeHandler} name='street' value={data.street}type="text" placeholder='Street' />
         <div className="multi-field">
          <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State' />
         </div>
         <div className="multi-field">
          <input required onChange={onChangeHandler} name='zipCode' value={data.zipCode} type="text" placeholder='Zip code' />
          <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country' />
         </div>
         <input required onChange={onChangeHandler} name='phone' value={data.phone} type="text"  placeholder='Phone' />
       </div>
     
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>${getTotalCartAmmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmmount()===0?0:getTotalCartAmmount()+2}</b>
            </div>
          </div>
          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
      </div>
      </form>
  )
}

export default PlaceOrder