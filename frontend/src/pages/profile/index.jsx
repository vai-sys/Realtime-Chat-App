import { useAppStore } from '@/store'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaPlus, FaTrash } from "react-icons/fa"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [bgColor, setBgColor] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const color = generateColorFromString(userInfo.email || firstName || 'default')
    setBgColor(color)
  }, [userInfo, firstName])

  
  const generateColorFromString = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    let color = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF
      color += ('00' + value.toString(16)).substr(-2)
    }
    return color
  }

  const getInitial = () => {
    if (firstName) return firstName.charAt(0).toUpperCase()
    if (userInfo.email) return userInfo.email.charAt(0).toUpperCase()
    return '?'
  }

  return (
    <div className='bg-[#1b1c24] min-h-screen flex items-center justify-center flex-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
        <div>
          <IoArrowBack
            className='text-4xl lg:text-6xl text-white/90 cursor-pointer'
            onClick={() => navigate(-1)}
          />
        </div>
        <div className='grid grid-cols-2'>
          <div
            className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <AvatarFallback 
                  className="text-black uppercase text-6xl flex items-center justify-center w-full h-full"
                  style={{ backgroundColor: bgColor }}  
                >
                  {getInitial()}
                </AvatarFallback>
              )}
            </Avatar>
            {hovered && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer'>
                {image ? <FaTrash className="text-white text-2xl" /> : <FaPlus className="text-white text-2xl" />}
              </div>
            )}
            
          </div>
          <div className='flex min-w-32 md-min-w-64 flex-col gap-5 text-white items-center justify-center'>
            <div className='w-full '>
              <Input placeholder="Email" type="email" disabled value={userInfo.email} className=" rounded-lg p-6 bg-[#2c2e3b] border-none" />
            </div>
            <div className='w-full '>
              <Input placeholder="Firstname" type="text"  value={firstName} className=" rounded-lg p-6 bg-[#2c2e3b] border-none"  onChange={(e)=>setFirstName(e.target.value)} />
            </div>
            <div className='w-full '>
              <Input placeholder="Lastname" type="text"  value={lastName} className=" rounded-lg p-6 bg-[#2c2e3b] border-none" onChange={(e)=>setLastName(e.target.value)} />
            </div>
           

          </div>
        </div>
      </div>
      <div>
        <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" >Save Changes</Button>
      </div>
    </div>
  )
}

export default Profile
