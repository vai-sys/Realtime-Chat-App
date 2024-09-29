


export const HOST = import.meta.env.VITE_SERVER_URL;

export const API_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${API_ROUTES}/signup`;
export const LOGIN_ROUTE = `${API_ROUTES}/login`;
export const GET_USER_INFO = `${API_ROUTES}/userInfo`;
export const UPDATE_PROFILE_ROUTE = `${API_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${API_ROUTES}/add-profile-image`;
export const DELETE_PROFILE_IMAGE_ROUTE = `${API_ROUTES}/remove-profile-image`;

export const LOGOUT_ROUTE=`${API_ROUTES}/logout`