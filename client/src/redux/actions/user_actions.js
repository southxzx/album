import axios from 'axios';
import { USER_SERVER } from '../../component/utils/misc';
// import { response } from 'express';
import { 
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from './types';



export const registerUser = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
    .then(response => response.data);

    return {
        type:REGISTER_USER,
        payload: request
    }
}

export const loginUser = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
    .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export const auth = () => {
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return{
        type: AUTH_USER,
        payload: request
    }
}

export const logoutUser = () => {
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return{
        type: LOGOUT_USER,
        payload: request
    }
}