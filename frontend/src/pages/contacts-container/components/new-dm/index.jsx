import React, { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { SEARCH_CONTACTS_ROUTES } from "@/utils/Constants";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useAppStore } from '@/store';
import { HOST } from '@/utils/Constants';

const NewDM = () => {
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchContacts, setSearchContacts] = useState([]);
  const { setSelectedChatData, setSelectedChatType } = useAppStore();

  const searchContactsHandler = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(SEARCH_CONTACTS_ROUTES, { searchTerm }, { withCredentials: true });

        if (response.status === 200 && response.data.contacts) {
          setSearchContacts(response.data.contacts);
        }
      } else {
        setSearchContacts([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  const getInitial = (contact) => {
    return contact.firstName 
      ? contact.firstName.charAt(0).toUpperCase() 
      : (contact.email ? contact.email.charAt(0).toUpperCase() : '?');
  };

  const selectNewContact = (contact) => {
    setOpenNewContactModal(false);
    setSelectedChatType("contact"); 
    setSelectedChatData(contact);
    setSearchContacts([]);
  };
  

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p className="bg-[#1c1b1c] border-none mb-2 p-3 text-white">Select New Contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent aria-describedby="dialog-description" className="bg-[#1c1b1e] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please Select a Contact</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2c3b] border-none"
              onChange={(e) => searchContactsHandler(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[250px] overflow-y-auto">
            <div className="flex flex-col gap-5">
              {searchContacts.map((contact) => {
                const bgColor = generateColorFromString(contact.firstName + contact.lastName);

                return (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => selectNewContact(contact)} 
                  >
                    <div className='flex gap-2 items-center'>
                      <Avatar className="h-10 w-10 md:w-14 md:h-14 rounded-full border-2 border-white">
                        {contact.image ? (
                          <AvatarImage
                            src={`${HOST}/${contact.image}`}
                            alt="profile"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <AvatarFallback
                            className="text-black uppercase text-2xl flex items-center justify-center w-full h-full"
                            style={{ backgroundColor: bgColor }} 
                          >
                            {getInitial(contact)} 
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="text-white">
                        <h3 className="text-base font-semibold">
                          {contact.firstName && contact.lastName ? 
                            `${contact.firstName || ''} ${contact.lastName || ''}`.trim() : 
                            " "}
                        </h3>
                        <p className="text-xs">{contact.email || 'user@example.com'}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
