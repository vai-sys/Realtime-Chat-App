// ContactsContainer.js
import React from 'react';

const ContactsContainer = () => {
  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-gray-700 w-full h-screen p-6 text-white'>
      <div className='pt-3 pb-6 border-b border-gray-700'>
        <span className='text-purple-600 text-lg font-bold'>Chat</span>
        <span className='text-gray-400 text-lg font-bold'>App</span>
      </div>

      
      <div className='my-5 space-y-2'>
        <div className='flex items-center justify-between pr-10'>
          <h6 className='text-neutral-400 font-light text-sm'>Direct Message</h6>
        </div>
        <div className='flex items-center justify-between pr-10'>
          <h6 className='text-neutral-400 font-light text-sm'>Channels</h6>
        </div>
        
      </div>
    </div>
  );
};

export default ContactsContainer;
