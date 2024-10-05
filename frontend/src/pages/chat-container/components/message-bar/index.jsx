// MessageBar.js
import { useSocket } from '@/context/SocketContext';
import { useAppStore } from '@/store';
import EmojiPicker from 'emoji-picker-react';
import React, { useState, useRef, useEffect } from 'react';
import { GrAttachment } from "react-icons/gr";
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerLine } from "react-icons/ri";

const MessageBar = () => {
  const emojiRef = useRef();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const { selectedChatType, selectedChatData, userInfo } = useAppStore();

  useEffect(() => {
    function handleClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: "undefined",
      });
      setMessage(""); // Clear message after sending
    }
  };

  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6'>
      <div className='flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5'>
        <input 
          type="text" 
          className='flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none' 
          placeholder='Enter Message' 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-400 transition-all'>
          <GrAttachment />
        </button>
        <div className='relative' ref={emojiRef}>
          <button 
            className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all pt-2' 
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>

          {emojiPickerOpen && (
            <div className='absolute bottom-16 right-0'>
              <EmojiPicker theme="dark" onEmojiClick={handleAddEmoji} autoFocusSearch={false} />
            </div>
          )}
        </div>
      </div>
      <button 
        className='focus:border-none focus:outline-none text-white duration-300 transition-all bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda]' 
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
