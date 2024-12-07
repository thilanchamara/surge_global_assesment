import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className='home-container'>
        <div className='card home-card'>
            <h5 style={{"padding":"10px"}}>John doe</h5>
            <div className='card-image'>
                <img src='https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
            </div>
            <div className='card-content'>
                <i className="material-icons" style={{"color":"red"}}>favorite</i>
                <h6>post title</h6>
                <p>welcome to the coding world</p>
                <input type='text' placeholder='Enter comment'/>
            </div> 
        </div>
        <div className='card home-card'>
            <h5 style={{"padding":"10px"}}>John doe</h5>
            <div className='card-image'>
                <img src='https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
            </div>
            <div className='card-content'>
                <i className="material-icons" style={{"color":"red"}}>favorite</i>
                <h6>post title</h6>
                <p>welcome to the coding world</p>
                <input type='text' placeholder='Enter comment'/>
            </div> 
        </div>
      
    </div>
  )
}

export default Home
