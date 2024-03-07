


// import React, { useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const ResetPass = () => {
//     const newPasswordRef = useRef();
//     const navigate = useNavigate();
//     const token = localStorage.getItem('token');

//     const submitHandler = (event) => {
//         event.preventDefault();
//         const enteredNewPassword = newPasswordRef.current.value;

//         fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCLPdt6hd56ixmlKEzUMU06fngO3dzpmXc', {
//             method: 'POST',
//             body: JSON.stringify({
//                 idToken: token,
//                 password: enteredNewPassword,
//                 returnSecureToken: false
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(res => {
//             if (res.ok) {
//                 localStorage.removeItem('token');
//                 navigate('/login');
//             } else {
//                 // Handle error here, maybe show a message to the user
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             // Handle error here, maybe show a message to the user
//         });
//     };

//     return (
//         <form onSubmit={submitHandler}>
//             <div>
//                 <label htmlFor="new-password">New Password</label>
//                 <br />
//                 <input type='password' id='new-password' ref={newPasswordRef} />
//             </div>
//             <div>
//                 <button type="submit">Change Password</button>
//             </div>
//         </form>
//     );
// };

// export default ResetPass;



import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordForm = () => {
    const newPasswordRef = useRef();
    const { oobCode } = useParams();
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        const newPassword = newPasswordRef.current.value;

        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyCLPdt6hd56ixmlKEzUMU06fngO3dzpmXc`, {
            method: 'POST',
            body: JSON.stringify({
                oobCode: oobCode,
                newPassword: newPassword
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                navigate('/login');
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
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="new-password">New Password</label>
                <br />
                <input type='password' id='new-password' ref={newPasswordRef} />
            </div>
            <div>
                <button type="submit">Change Password</button>
            </div>
        </form>
    );
};

export default ResetPasswordForm;
