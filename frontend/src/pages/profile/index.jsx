import { useAppStore } from '@/store'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {IoArrowBack} from "react-icons/io5"

const Profile = () => {
  const {userInfo,setUserInfo}=useAppStore();
  const [firstName,setFirstName]=useState("");
  const [lastname,setLastname]=useState("");
  const [image,setImage]=useState(null);
  const [hovored,setHovored]=useState(false);
  


  const navigate=useNavigate();

  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
        <div>
          <IoArrowBack  className='text-4xl lg:text-6xl text-white/90 cursor-pointer'/>
        </div>
        <div className='grid grid-cols-2'>
          <div className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center' onMouseEnter={()=>setHovored(true)}
            onMouseLeave={()=>setHovored(false)}>
 
          </div>

        </div>

      </div>
     
    </div>
  )
}

export default Profile
