export const createAuthSlice = (set) => ({
    userInfo: null, 
    setUserInfo: (info) => set({ userInfo: info }), 
  });
  