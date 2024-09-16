// import { useAppStore } from '@/store'
// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify'; 

// const Chat = () => {
//   const { userInfo } = useAppStore();
//   const navigate = useNavigate();

//  useEffect(()=>{
//   if (!userInfo?.profileSetup) {
//     toast("Please setup profile to continue");
//     navigate("/profile");
//     return null; 
//   }
//  },[userInfo,navigate])

//   return (
//     <div>
//       Chat content goes here
//     </div>
//   );
// }

// export default Chat;

import { useAppStore } from '@/store';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.profileSetup) {
      toast("Please setup profile to continue");
   
      setTimeout(() => {
        navigate("/profile");
      }, 1000); 
    }
  }, [userInfo, navigate]);

  return (
    <div>
      Chat content goes here
    </div>
  );
}

export default Chat;
