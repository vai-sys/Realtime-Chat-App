import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Input } from "@/components/ui/input";


const NewDM=()=>{
    const[openNewContactModal,setOpenNewContactModal]=useState(false);

    const serachContacts=(searchTerm)=>{

    }
  return (
    <>
 <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
        <FaPlus className="text-neutral-400  font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300 " onClick={()=>setOpenNewContactModal(true)}/>
    </TooltipTrigger>
    <TooltipContent>
      <p className="bg-[#1c1b1c] border-none mb-2 p-3 text-white" >select new contact</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
<Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
 
  <DialogContent className="bg-[#1c1b1e] border-none text-white w-[400px] h-[400px] flex flex-col  ">
    <DialogHeader>
      <DialogTitle>Please Select a Contact</DialogTitle>
      <DialogDescription>
      </DialogDescription>
    </DialogHeader>
    <div>
        <Input placeholder="search Contacts" className="rounded-lg p-6 bg-[#2c2c3b] border-none" onChange={e=>serachContacts(e.target.value)}/>
    </div>
  </DialogContent>
</Dialog>


    
    
    </>
)

}

export default NewDM;