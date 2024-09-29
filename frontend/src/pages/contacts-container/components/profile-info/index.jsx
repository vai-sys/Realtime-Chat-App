import React, { useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from '@/store';
import { HOST } from '@/utils/Constants';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { IoPowerSharp } from 'react-icons/io5';



const ProfileInfo = () => {
  const { userInfo } = useAppStore();
  const navigate=useNavigate();
  const profileImage = userInfo?.image;
  const firstName = userInfo?.name ? userInfo.name.split(' ')[0] : null;

 
const logout=async()=>{


}

  const generateColorFromString = useCallback((str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
  }, []);


  const getInitial = () => {
    return firstName 
      ? firstName.charAt(0).toUpperCase() 
      : (userInfo?.email ? userInfo.email.charAt(0).toUpperCase() : '?');
  };


  const bgColor = generateColorFromString(userInfo?.name || userInfo?.email || '');

  return (
    <div className='absolute bottom-0 h-16 flex items-center justify-between px-4 ml-[-20px] w-full bg-[#2a2b33] shadow-md'>
      <div className='flex gap-2 items-center'>
        <Avatar className="h-10 w-10 md:w-14 md:h-14 rounded-full border-2 border-white">
          {profileImage ? (
            <AvatarImage
              src={`${HOST}/${profileImage}`}
              alt="profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <AvatarFallback
              className="text-black uppercase text-2xl flex items-center justify-center w-full h-full"
              style={{ backgroundColor: bgColor }}
            >
              {getInitial()}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="text-white">
          <h3 className="text-base font-semibold">{userInfo?.firstName || 'User Name'}</h3>
          <p className="text-xs">{userInfo?.email || 'user@example.com'}</p>
        </div>
      </div>

      <div className='flex gap-5'>
      <TooltipProvider>
  <Tooltip>
    <TooltipTrigger> <FiEdit2 className='text-purple-700 font-medium text-2xl' onClick={()=>navigate("/profile")} /> </TooltipTrigger>
    <TooltipContent className="bg-[#1c1b1e] border-none text-white">
      <p>Edit Profile</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger> <IoPowerSharp  className='text-red-800 font-medium text-2xl '  />  </TooltipTrigger>
    <TooltipContent className="bg-[#1c1b1e] border-none text-white">
      <p>Logout</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>


      </div>

    </div>
  );
}

export default ProfileInfo;
