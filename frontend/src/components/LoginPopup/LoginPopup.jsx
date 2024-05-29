import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const LoginPopup = ({setShowLogin}) => {
    const [currState,setCurrState]=useState("Login")
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const {url,setToken} = useContext(StoreContext)


    const onChangeHandler = (e)=>{
      const name = e.target.name;
      const value = e.target.value;
      setData(data=>({...data,[name]:value}))
    }
    
    const onLogin = async(e)=>{
      e.preventDefault()
      let newUrl = url;
      if(currState==="Login"){
        newUrl+="/api/user/login"
      }
      else{
        newUrl+="/api/user/register"
      }

      const res = await axios.post(newUrl,data)
      if(res.data.success){
        setToken(res.data.token)
        localStorage.setItem("token",res.data.token)
        setShowLogin(false)
      }
      else{
        alert(res.data.message)
      }
    }

  return (
    <div className='login-popup'>
       <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currState==='Login'?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='your name' required/>}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='your email' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required/>
        </div>
        <button type='submit'>{currState==='Sign-Up'?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By countinuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currState==='Login'?<p>Create a new account? <span onClick={()=>setCurrState("Sign-Up")}>Click Here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
       </form>
    </div>
  )
}

export default LoginPopup