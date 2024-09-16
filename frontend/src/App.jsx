// import React from 'react'
// import { Button } from './components/ui/button'
// import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom'
// import Auth from './pages/auth'
// import Chat from './pages/chat'
// import Profile from './pages/profile'
// import { useAppStore } from './store'

// const privateRoute=({children})=>{
//   const {userInfo} =useAppStore();
//  const isAuthenticated=!!userInfo;
//   return isAuthenticated ?children :<Navigate to="/auth"  />
// }

// const AuthRoute=({children})=>{
//   const {userInfo} =useAppStore();
//  const isAuthenticated=!!userInfo;
//   return isAuthenticated ?<Navigate to="/chat" /> : children ;
// }

// const App = () => {
//   return (
//    <BrowserRouter>
//    <Routes>
//     <Route path="auth" element={<AuthRoute >
//       <Auth/>
//     </AuthRoute>}/>
//     <Route path="chat" element={<privateRoute>
//       <Chat/>
//     </privateRoute>}/>
//     <Route path="profile" element={<privateRoute>
//       <Profile/>
//     </privateRoute>}/>
//     <Route path="*" element={<Navigate to="/auth"/>}/>
//    </Routes>
   
//    </BrowserRouter>
//   )
// }

// export default App
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './pages/auth';
import Chat from './pages/chat';
import Profile from './pages/profile';
import { useAppStore } from './store';
import { apiClient } from './lib/api-client';
import { GET_USER_INFO } from './utils/Constants';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return !isAuthenticated ? children : <Navigate to="/chat" />;
};

const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true, 
        });
        setUserInfo(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); 
      }
    };

    if (!userInfo) {
      getUserInfo();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  // if (loading) {
  //   return <div>Loading...</div>; 
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path="chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
