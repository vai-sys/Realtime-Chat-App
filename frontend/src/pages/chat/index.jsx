// Chat.js
import { useAppStore } from '@/store';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

import ContactsContainer from '@/pages/contacts-container/index';
import EmptyChatContainer from '@/pages/empty-chat-container/index';
import ChatContainer from '@/pages/chat-container/index';

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
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer className="w-1/4" />
     {/* <EmptyChatContainer/> */}
     <ChatContainer/>
    </div>
  );
}

export default Chat;
