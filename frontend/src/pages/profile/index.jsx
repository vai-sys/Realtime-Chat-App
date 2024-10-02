

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { apiClient } from '@/lib/api-client';
import { ADD_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE, DELETE_PROFILE_IMAGE_ROUTE } from '@/utils/Constants';



const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState(userInfo.firstName || "");
  const [lastName, setLastName] = useState(userInfo.lastName || "");
  const [image, setImage] = useState(userInfo.image || null);
  const [hovered, setHovered] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(!userInfo.firstName || !userInfo.lastName);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

 

  const generateColorFromString = useCallback((str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }, []);

  useEffect(() => {
    const color = generateColorFromString(userInfo.email || firstName || 'default');
    setBgColor(color);
    setImage(userInfo.image || null);
  }, [userInfo, firstName, generateColorFromString]);

  const validateProfile = () => {
    if (!firstName.trim()) {
      toast.error("First Name is required");
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Last Name is required");
      return false;
    }
    return true;
  };


 
  
    const saveChanges = async () => {
      if (validateProfile()) {
        setIsLoading(true);
        try {
          const response = await apiClient.put(
            UPDATE_PROFILE_ROUTE,
            { firstName, lastName },
            { withCredentials: true }
          );
  
          if (response.status === 200) {
            const updatedUserInfo = { ...userInfo, firstName, lastName };
            setUserInfo(updatedUserInfo);
            
           
            toast.success("Profile Updated Successfully");
          
            const isNewUserComplete = isNewUser && firstName && lastName;
           
            setTimeout(() => {
              if (isNewUserComplete) {
                setIsNewUser(false);  
                navigate("/chat", { replace: true });  
              } else if (!isNewUser) {
                navigate(-1);  
              }
            }, 1000);
          } else {
            toast.error("Failed to update profile.");
          }
        } catch (err) {
          console.error("Profile update error: ", err);
          toast.error("An error occurred while updating the profile.");
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    const handleBackNavigation = () => {
      if (isNewUser) {
       
        if (!firstName || !lastName) {
          toast.warning("Please complete your profile first.");
          return;
        }
      }
      navigate(-1);
    };


  const getInitial = () => {
    return firstName ? firstName.charAt(0).toUpperCase() : (userInfo.email ? userInfo.email.charAt(0).toUpperCase() : '?');
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    
    if (file) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await apiClient.post(
          ADD_PROFILE_IMAGE_ROUTE,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        
        if (response.status === 200) {
          const newImage = response.data.image;
          setUserInfo({...userInfo, image: newImage});
          setImage(newImage);
          toast.success("Profile Image Added Successfully");
        }
      } catch (err) {
        console.error("Image upload error:", err);
        toast.error("Failed to upload image");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("No file selected");
    }
  };

  const handleDeleteImage = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.delete(DELETE_PROFILE_IMAGE_ROUTE, { withCredentials: true });
      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        setImage(null);
        getInitial();
        toast.success("Profile image deleted successfully");
      } else {
        toast.error("Failed to delete profile image");
      }
    } catch (err) {
      toast.error("An error occurred while deleting the profile image");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-[#1b1c24] min-h-screen flex items-center justify-center flex-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
        <div>
        <IoArrowBack
            className='text-4xl lg:text-6xl text-white/90 cursor-pointer'
            onClick={handleBackNavigation}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div
            className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center mx-auto md:mx-0'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <AvatarFallback 
                  className="text-black uppercase text-6xl flex items-center justify-center w-full h-full"
                  style={{ backgroundColor: bgColor }}  
                >
                  {getInitial()}
                </AvatarFallback>
              )}
            </Avatar>
            {hovered && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer' onClick={image ? handleDeleteImage : handleFileInputClick}>
                {image ? <FaTrash className="text-white text-2xl" /> : <FaPlus className="text-white text-2xl" />}
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className='hidden' 
              onChange={handleImageChange} 
              name='profile-image' 
              accept='image/png, image/jpeg, image/webp, image/svg+xml, image/gif' 
            />
          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center'>
            <div className='w-full'>
              <Input 
                placeholder="Email" 
                type="email" 
                disabled 
                value={userInfo.email} 
                className="rounded-lg p-6 bg-[#2c2e3b] border-none" 
              />
            </div>
            <div className='w-full'>
              <Input 
                placeholder="First name" 
                type="text" 
                value={firstName} 
                className="rounded-lg p-6 bg-[#2c2e3b] border-none" 
                onChange={(e) => setFirstName(e.target.value)} 
              />
            </div>
            <div className='w-full'>
              <Input 
                placeholder="Last name" 
                type="text" 
                value={lastName} 
                className="rounded-lg p-6 bg-[#2c2e3b] border-none" 
                onChange={(e) => setLastName(e.target.value)} 
              />
            </div>
          </div>
        </div>
      </div>
      <div className='w-[80vw] md:w-96'>
        <Button 
          className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" 
          onClick={saveChanges}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default Profile;