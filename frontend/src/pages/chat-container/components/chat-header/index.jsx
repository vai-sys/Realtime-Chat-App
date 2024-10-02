// ChatHeader.js
import { useAppStore } from '@/store';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from 'react';
import {RiCloseFill} from "react-icons/ri";
import { HOST } from '@/utils/Constants';

const ChatHeader = () => {
  const {closeChat,selectedChatData}=useAppStore();


  const generateColorFromString = (str) => {
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
  };

  const getInitial = (selectedChatData) => {
    return selectedChatData.firstName 
      ? selectedChatData.firstName.charAt(0).toUpperCase() 
      : (selectedChatData.email ? selectedChatData.email.charAt(0).toUpperCase() : '?');
  };

 
  return (
    <div className=' h-[10vh] border-b-2  border-[#2f303b] p-4 flex flex-center justify-between px-20  '>
      <div className='flex gap-5 items-center '>
       <div className='flex gap-3 items-center justify-center'>

       <div className='flex gap-2 items-center'>
                      <Avatar className="h-10 w-10 md:w-14 md:h-14 rounded-full border-2 border-white">
                        {selectedChatData.image ? (
                          <AvatarImage
                            src={`${HOST}/${selectedChatData.image}`}
                            alt="profile"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <AvatarFallback
                            className="text-black uppercase text-2xl flex items-center justify-center w-full h-full"
                            style={{ backgroundColor: bgColor }} 
                          >
                            {getInitial(selectedChatData)} 
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="text-white">
                        <h3 className="text-base font-semibold">
                          {selectedChatData.firstName && selectedChatData.lastName ? 
                            `${selectedChatData.firstName || ''} ${selectedChatData.lastName || ''}`.trim() : 
                            " "}
                        </h3>
                        <p className="text-xs">{selectedChatData.email || 'user@example.com'}</p>
                      </div>
                    </div>

       </div>

       <div className='flex items-center justify-center gap-5 '>

        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all' onClick={closeChat}>
          <RiCloseFill className='text-3xl'/>
        </button>
       </div>

      </div>
    </div>
  );
};

export default ChatHeader;
