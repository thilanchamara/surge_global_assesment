import React from 'react'
import './profile.css'

const Profile = () => {
  return (
    <div className='main-container'>
      <div className='profile-container'>
        <div>
            <img src='https://images.pexels.com/photos/1816644/pexels-photo-1816644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' style={{width:'166px', height:'166px',borderRadius:"50%"}}/>
        </div>
        <div className='profile-details'>
            <h4>John Doe</h4>
            <div className='following'>
                <h6>20 posts</h6>
                <h6>56 followers</h6>
                <h6>20 following</h6>
            </div>
        </div>
      </div>
      <div className='posts'>
        <img src='https://images.pexels.com/photos/1816644/pexels-photo-1816644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='post'/>
        <img src='https://images.pexels.com/photos/1816644/pexels-photo-1816644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='post'/>
        <img src='https://images.pexels.com/photos/1816644/pexels-photo-1816644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='post'/>
        <img src='https://images.pexels.com/photos/1816644/pexels-photo-1816644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='post'/>
      </div>
    </div>
  )
}

export default Profile
