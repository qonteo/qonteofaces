import axios from 'axios';
import * as c from '../constants';

export async function register(data){
    try{
        console.log({data});
        let res = await axios.post(c.REGISTER, data);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function login(data){
    //console.log(data);
    try{
        let res = await axios.post(c.LOGIN, data);
        console.log({res});
        
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export async function facelogin(photo){
    try{
      //  let res = await axios.post(c.FACE_LOGIN, photo);
      //  return res.data;            
    }catch (e) {
        throw handler(e);
    }
}

export async function forgotPassword(data) {
    try {
        let res = await axios.post(c.FORGOT_PASSWORD, data);

        return res.data;
    } catch (e) {
        throw handler(e);
    }
}


export async function logout(data){
    try{
        console.log("LOGOUT");
        let res = await axios.post(c.LOGOUT, data);
        console.log({res});
        
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}




export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}