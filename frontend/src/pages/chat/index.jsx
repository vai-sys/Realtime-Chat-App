// Chat.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

import { useAppStore } from '@/store';
import ContactsContainer from '@/pages/contacts-container/index';
import EmptyChatContainer from '@/pages/empty-chat-container/index';
import ChatContainer from '@/pages/chat-container/index';

const Chat = () => {
  const { userInfo, selectedChatType } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
   
    if (!userInfo?.profileSetup) {
      toast("Please setup your profile to continue");
      const timer = setTimeout(() => {
        navigate("/profile");
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [userInfo, navigate]);

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
    <ContactsContainer className="w-1/4" />
    {selectedChatType === "contact" ? <ChatContainer /> : <EmptyChatContainer />}
  </div>
  );
}

export default Chat;
