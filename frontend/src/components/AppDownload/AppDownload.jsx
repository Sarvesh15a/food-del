import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
       <p>  For batter experience Download <br /> Tomate App </p>
       <div className="app-download-plateform">
        <img src={assets.app_store} alt="" />
        <img src={assets.play_store} alt="" />
       </div>
    </div>
  )
}

export default AppDownload