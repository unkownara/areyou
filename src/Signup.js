import React, { useState } from 'react';
import { useInput } from './hooks';
import { user_info_url } from './backend/Apis';
import cookie from 'react-cookies';
import history from "./history";
import { makeid } from './Generics';

export function Signup() {

    const [errorMsg, setErrorMsg] = useState('');

    const userName = useInput('');
    const userEmail = useInput('');
    const password = useInput('');
    const phoneNumber = useInput('');

    const onSubmit = () => {
        import('./backend/ApiRequests').then(obj => {
            let payload = {
                name: userName.value,
                userId: userEmail.value,
                password: password.value,
                phoneNumber: phoneNumber.value
            };
            obj.postApiRequestCall(user_info_url, payload, function(response) {
                try {
                    if(response && response.data) {
                        setErrorMsg('');
                        cookie.save('__u_id__', userEmail.value);
                        history.push({
                            pathname: '/',
                            search: `?u_id=${makeid(6)}`,
                            state: {detail: payload}
                        });
                    } else {
                        setErrorMsg('Something wrong');
                    }
                } catch (e) {
                    console.log('something went wrong');
                    setErrorMsg('Something wrong');
                }
            })
        });
    };

    return (
        <>
            <input
                {...userName}
                placeholder={'User name'}
            />
            <input
                {...userEmail}
                placeholder={'Email Id'}
            />
            <input
                {...password}
                placeholder={'Password'}
            />
            <input
                {...phoneNumber}
                placeholder={'phone number'}
            />
            <button onClick={onSubmit}>
                Signup
            </button>
            <span>
                {errorMsg}
            </span>
        </>
    );
}