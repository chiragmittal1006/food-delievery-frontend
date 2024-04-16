import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

function Footer() {
  return (
    <div className='footer' id='footer'>
    <div className="footer-content">
      <div className="footer-left">
        <img src={assets.logo} alt="" />
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus praesentium eum laborum perferendis illum atque cumque, quia labore consequatur, natus illo, soluta obcaecati dolorum neque ex voluptatum error amet maxime? corrupti voluptates!</p>
        <div className="footer-left-images">
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
          <img src={assets.linkedin_icon} alt="" />
        </div>
      </div>
      <div className="footer-center">
        <h2>Company</h2>
        <ul>
          <li>Home</li>
          <li>About us</li>
          <li>Delievery</li>
          <li>privacy policy</li>
        </ul>
      </div>
      <div className="footer-right">
        <h2>GET IN TOUCH</h2>
        <span>+91 7206466491</span>
        <span>chiragmittal7333@gmail.com</span>
      </div>
    </div>
    <hr />
    <p>Copyright 2024 @tomato.com - All right reserved</p>
    </div>
  )
}

export default Footer
