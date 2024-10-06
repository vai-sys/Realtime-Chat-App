// import { useAppStore } from '@/store';
// import React, { useRef, useEffect } from 'react';
// import moment from 'moment';
// import { apiClient } from '@/lib/api-client';
// import { GET_ALL_MESSAGES_ROUTE } from '@/utils/Constants';

// const MessageContainer = () => {
//   const scrollRef = useRef();
//   const {
//     selectedChatType,
//     selectedChatData,
//     selectedChatMessage,
//     userInfo,
//     setSelectedChatMessage
//   } = useAppStore();

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const response = await apiClient.post(GET_ALL_MESSAGES_ROUTE, { id: selectedChatData._id }, { withCredentials: true });
//         if (response.data.messages) {
//           setSelectedChatMessage(response.data.messages);
//         }
//       } catch (err) {
//         console.log(err);
//         // Optionally set an error state to display a message to the user
//       }
//     };

//     if (selectedChatData._id && selectedChatType === "contact") {
//       getMessages();
//     }
//   }, [selectedChatData, selectedChatType, setSelectedChatMessage]);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [selectedChatMessage]);

//   const renderDMMessages = (message) => (
//     <div className={`${message.sender === userInfo._id ? "text-right" : "text-left"}`}>
//       {message.messageType === "text" && (
//         <div className={`border inline-block p-4 my-1 max-w-[50%] break-words ${message.sender === userInfo._id ? "bg-[#8417ff] text-white border-[#8417ff]" : "bg-[#2a2b33] text-white border-[#ffffff]"}`}>
//           {message.content}
//         </div>
//       )}
//       <div className='text-xs text-gray-600'>
//         {moment(message.timestamp).format("LT")}
//       </div>
//     </div>
//   );

//   const renderMessages = () => {
//     if (!selectedChatMessage.length) {
//       return <div className="text-center text-gray-500">No messages yet</div>;
//     }

//     let lastDate = null;
//     return selectedChatMessage.map((message) => {
//       const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
//       const showDate = messageDate !== lastDate;
//       lastDate = messageDate;

//       return (
//         <div key={message._id}>
//           {showDate && <div className="text-center text-gray-500 my-2">{moment(message.timestamp).format("LL")}</div>}
//           {selectedChatType === "contact" && renderDMMessages(message)}
//         </div>
//       );
//     });
//   };

//   return (
//     <div className='flex-1 overflow-y-auto p-4 scrollbar-hidden px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full'>
//       {renderMessages()}
//       <div ref={scrollRef} />
//     </div>
//   );
// };

// export default MessageContainer;


import { useAppStore } from '@/store';
import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import { apiClient } from '@/lib/api-client';
import { GET_ALL_MESSAGES_ROUTE } from '@/utils/Constants';

const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessage,
    userInfo,
    setSelectedChatMessage
  } = useAppStore();

 
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(GET_ALL_MESSAGES_ROUTE, { id: selectedChatData._id }, { withCredentials: true });
        console.log('Fetched Messages:', response.data.messages); 
        if (response.data.messages) {
          setSelectedChatMessage(response.data.messages);
        }
      } catch (err) {
        console.log('Error fetching messages:', err); 
      }
    };

    if (selectedChatData._id && selectedChatType === 'contact') {
      getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessage]);

 
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChatMessage]);


  const renderDMMessages = (message) => (
    <div className={`${message.sender === userInfo._id ? 'text-right' : 'text-left'}`}>
    
      {message.messageType === 'text' && message.content && (
        <div className={`border inline-block p-4 my-1 max-w-[50%] break-words ${message.sender === userInfo._id ? 'bg-[#8417ff] text-white border-[#8417ff]' : 'bg-[#2a2b33] text-white border-[#ffffff]'}`}>
          {message.content}
        </div>
      )}

      <div className='text-xs text-gray-600'>
        {moment(message.timestamp).format('LT')}
      </div>
    </div>
  );

 
  const renderMessages = () => {
    if (!selectedChatMessage || !selectedChatMessage.length) {
      return <div className="text-center text-gray-500">No messages yet</div>;
    }
  
    let lastDate = null;
    return selectedChatMessage.map((message) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
  
      return (
        <div key={message._id}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          <div
            className={`${
              message.sender === userInfo._id ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`border inline-block p-4 my-1 max-w-[50%] break-words ${
                message.sender === userInfo._id
                  ? "bg-[#8417ff] text-white border-[#8417ff]"
                  : "bg-[#2a2b33] text-white border-[#ffffff]"
              }`}
            >
              {message.content}
            </div>
            <div className="text-xs text-gray-600">
              {moment(message.timestamp).format("LT")}
            </div>
          </div>
        </div>
      );
    });
  };
  

  return (
    <div className='flex-1 overflow-y-auto p-4 scrollbar-hidden px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full'>
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;

