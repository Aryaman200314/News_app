import React from 'react'
import './News.css'
import nopeImage from './nope.jpg';

function Newsitem({title, description, image, url}  ) {
  return (
    <div className="main2">
        <h1 className='header'>{title?title:"No title"}</h1>
        <p className='para'>{description?description:"No description"} <a className="readMore" href ={url}>Read More</a></p>
        <img className="images" src={image?image:"nope.jpg"} alt='no'/>
        
    </div>
  )
}

export default Newsitem