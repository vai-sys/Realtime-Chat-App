

import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client"; 
import { useAppStore } from "@/store";
import { HOST } from "@/utils/Constants";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { userInfo } = useAppStore();  

  useEffect(() => {
    if (userInfo) { 
    
      socket.current = io(HOST, {
        withCredentials: true, 
        query: { userId: userInfo.id },  
      });

      
      socket.current.on("connect", () => {
        console.log("connected to socket server");
      });

      const handleReceiveMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage } = useAppStore.getState();
        
       
        if (
          selectedChatType !== undefined &&
          (
            selectedChatData._id === message.sender._id || 
            selectedChatData._id === message.recipient._id
          )
        ) {
          addMessage(message); 
        }
      };

     
      socket.current.on("receiveMessage", handleReceiveMessage);

      
      return () => {
        if (socket.current) {
          socket.current.off("receiveMessage", handleReceiveMessage); 
          socket.current.disconnect(); 
          console.log("disconnected from socket server");
        }
      };
    }
  }, [userInfo]); 

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
}


