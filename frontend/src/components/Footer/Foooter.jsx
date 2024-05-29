import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Foooter = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, minima! Dicta dolores numquam deserunt, architecto doloremque saepe iure animi non repellat neque itaque tempora voluptas officiis dignissimos nam quia laboriosam?</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-6306053193</li>
                    <li>yadsarvesh15@gmail.com</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Foooter