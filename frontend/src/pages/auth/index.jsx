


import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { apiClient } from "../../lib/api-client"; 
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/Constants';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useAppStore } from '@/store';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate=useNavigate();
  const {setUserInfo} =useAppStore();
  

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");  
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");  
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const HandleLogin = async () => {
    if (validateLogin()) {
      try {
        const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
        console.log(response);
        toast.success("Login successful!");
        setEmail('');
        setPassword('');
        if(response.data.user.id){
          setUserInfo(response.data.user)
          if(response.data.user.profileSetup){
            navigate("/chat")
          }
          else{
            navigate("/profile");
          }
        }
      } catch (error) {
        console.error('Login Error:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Login failed");
      }
    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      try {
        const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });
        console.log(response);
        toast.success("Signup successful!");
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        if(response.status==201){
          navigate('/profile')
        }
      } catch (error) {
        console.error('Signup Error:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Signup failed");
      }
    }
  };

  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
      <div className='h-[80vh] bg-white border-white border-2 text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] rounded-3xl grid xl:grid-cols-2'>
        <div className='flex items-center justify-center flex-col'>
          <div className='flex items-center justify-center'>
            <h1 className='text-5xl font-bold md:text-6xl'>Welcome</h1>
          </div>
          <p className='font-medium text-center mt-6'>
            Fill in the details to get started
          </p>
        </div>
        <div className='flex items-center justify-center w-full'>
          <Tabs className='w-3/4' defaultValue='login'>
            <TabsList className="bg-transparent rounded-none w-full">
              <TabsTrigger value="login" className="text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">
                Signup
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="flex flex-col gap-5 mt-14">
              <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={e => setEmail(e.target.value)} />
              <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={e => setPassword(e.target.value)} />
              <Button className="rounded-full p-6" onClick={HandleLogin}>Login</Button>
            </TabsContent>
            <TabsContent value="signup" className="flex flex-col gap-5 mt-14">
              <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={e => setEmail(e.target.value)} />
              <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={e => setPassword(e.target.value)} />
              <Input placeholder="Confirm Password" type="password" className="rounded-full p-6" value={confirmpassword} onChange={e => setConfirmPassword(e.target.value)} />
              <Button className="rounded-full p-6" onClick={handleSignup}>Signup</Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Auth;
