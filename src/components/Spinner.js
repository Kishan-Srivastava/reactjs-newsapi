import React from 'react'
import image from "../giphy.gif"
export default function Spinner() {
  return (
    <div className="container text-center">
      <img className='img-fluid' src={image} alt="spinner"></img>
    </div>
  )
}
