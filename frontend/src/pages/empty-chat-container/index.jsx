// EmptyChatContainer.js
import React from 'react';

const EmptyChatContainer = () => {
  return (
    <div className='flex-1 md:flex items-center  flex-col justify-center bg-[#1c1d25] md:bg[#1c1d25] hidden duration-1000 transition-all'>
     

      <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center'>

      <h3 className='text-gray-400 text-lg'>Welcome To ChatApp</h3>

      </div>
    </div>
  );
};

export default EmptyChatContainer;
