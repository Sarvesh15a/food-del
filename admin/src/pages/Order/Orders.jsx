import React from 'react'
import './Orders.css'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Orders = ({url}) => {
  const [orders,setOrders] = useState([])

  const fetchAllOrders = async()=>{
     const res = await axios.get(url+"/api/order/list")
     if(res.data.success){
      setOrders(res.data.data)
      console.log(res.data.data)
     }else{
      toast.error("Error")
     }
  }
   
  const statusHandler = async(event,orderId)=>{
   const res = await axios.post(url+"/api/order/status",{
    orderId,
    status:event.target.value
   })
   if(res.data.success){
    await fetchAllOrders()
   }
  }


  useEffect(()=>{
    fetchAllOrders()
  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
            {
               orders.map((order,index)=>{
                    return(
                        <div key={index} className="order-item">
                            <img src={assets.parcel_icon} alt="" />
                           <div>
                           <p className='order-item-food'>{
                            order.items.map((item,index)=>{
                                if(index===order.items.length-1){
                                    return item.name+" X "+item.quantity
                                }else{
                                    return item.name+" X "+item.quantity+" , "
                                }
                            })
                           }</p>
                           <p className="order-item-name">{order.address.firstName +" "+ order.address.lastName}</p>
                           <div className="order-item-address">
                            <p>{order.address.street +", "}</p>
                            {order.address.city +", "+order.address.state+", "+order.address.country+", "+order.address.zipCode}
                           </div>
                           <p>{order.address.phone}</p>
                           </div>
                           <p>Item: {order.items.length}</p>
                           <p>${order.amount}</p>
                           <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} >
                            <option value="Food Procession">Food Procession</option>
                            <option value="Out For Delivery">Out For Delivery</option>
                            <option value="Delivered">Delivered</option>
                           </select>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Orders