import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResetPasswordForm from "./ResetPass";
const ResetPassLink = () => {
    const emailRef = useRef();
    const navigate = useNavigate();
    const [emailSent, setEmailSent] = useState(false);

    const sendResetEmail = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCLPdt6hd56ixmlKEzUMU06fngO3dzpmXc', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                requestType: 'PASSWORD_RESET'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                setEmailSent(true);
                navigate('/login')
            } else {
                // Handle error here, maybe show a message to the user
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error here, maybe show a message to the user
        });
    };

    return (
        <div>
            
                <form onSubmit={sendResetEmail}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type='email' id='email' ref={emailRef} />
                    </div>
                    <div>
                        <button type="submit">Send Reset Link</button>
                    </div>
                </form>
           
        </div>
    );
};

export default ResetPassLink;
