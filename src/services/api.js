import axios from 'axios';
import * as c from '../constants';

export async function deletePhoto(data){
    try{
        console.log({data});
        let res = await axios.post(c.DELETE_PHOTO, data);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function updateProfile(userId, data){
    console.log("Running function updateProfile...");
    console.log({data});

    try{
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };

        const form_data = new FormData();
        form_data.append('user_id',`${userId}`);
        for ( let key in data )
            form_data.append(key, data[key]);
            
        // let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, form_data, options);
        let res = await axios.post(c.UPDATE_PROFILE, data);
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