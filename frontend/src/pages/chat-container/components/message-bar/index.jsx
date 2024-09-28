// MessageBar.js
import React from 'react';
import { useState } from 'react';
import {GrAttachment} from "react-icons/gr"
const MessageBar = () => {
  const [message,setMessage]=useState("");
  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6  '>
     <div className='flex-1 flex bg-[#2a2b33] rounded-md item-center gap-5 pr-5'>

      <input type="text" className='flex-1 p-5  bg-transparent rounded-md focus:border-none focus:outline-none' placeholder='Enter Message' value={message} onChange={(e)=>setMessage(e.target.value)}></input>
      <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-400 transition-all'>
        <GrAttachment />
      </button>

     </div>
    </div>
  );
};

export default MessageBar;
