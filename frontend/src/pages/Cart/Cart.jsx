import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'


const Cart = () => {
  const {cartItems,food_list,removeFromCart,getTotalCartAmmount,url} = useContext(StoreContext) 
  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Totle</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
       {
        food_list.map((item,index)=>{
          if(cartItems[item._id]>0)
            {
              return(
               <div className="">
                 <div key={index} className="cart-item-title cart-items-item">
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price*cartItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)} className='cross'>Delete</p>
                </div>
                <hr />
               </div>
              )
            }
        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        
        <div className="cart-promocode">
         <div>
         <p>If you a have promo code, enter it here</p>
         <div className="cart-promocode-input">
          <input type="text" placeholder='promo code' />
          <button>Submit</button>
         </div>
         </div>
        </div>
      </div>


    </div>
  )
}

export default Cart