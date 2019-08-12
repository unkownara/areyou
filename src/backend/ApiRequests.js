import axios from 'axios';

export const getApiRequestCall = function(url, payload, callback) {
    axios.get(url, {
        params: payload,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    }).then(res => {
        callback(res);
        // console.log('response ', res);
    }).catch(err => {
        // console.log('error ', err);
        callback(err);
    });
};


export const postApiRequestCall = function(url, payload, callback) {
    axios({
        method: 'POST',
        url: url,
        data: JSON.stringify({
            payload: payload,
        }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    }).then(res => {
        callback(res);
        // console.log('response ', res);
    }).catch(err => {
        callback(err);
        console.log('error ', err);
    });
};