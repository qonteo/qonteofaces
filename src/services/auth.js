
import * as c from '../constants';

export async function login(data){
    try{
        console.log("DATA", data);

        await fetch(c.LOGIN, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              //Header Defination
              'Accept': 'application/json',
              'Content-Type': 'application/json;',
            },
          }).then(response => response.json())
            .then(responseJson => {
              console.log(responseJson);
              return responseJson;
            }).catch(error => {
              console.error(error);
            });
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