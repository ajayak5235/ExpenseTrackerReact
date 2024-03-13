

import React, { useRef, useState } from 'react';
import { Form, Button, FormLabel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Login from './Login';
const SignUp = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const emailEntered = emailInputRef.current.value
    const passEntered = passwordInputRef.current.value

console.log(emailEntered,passEntered)


    if (isLogin) {
      // Logic for login
    } else {
      if (passEntered !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLPdt6hd56ixmlKEzUMU06fngO3dzpmXc', {
        method: 'POST',
        body: JSON.stringify({
          email: emailEntered,
          password: passEntered,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.ok) {
          // SignUp successful
          
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      });
    }
  };

  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div style={{border:'2px solid #ccc' ,borderRadius:'5px' , margin:'auto' , width:'20rem', marginTop:'8%'}} >
      <Form onSubmit={submitHandler} style={{margin:'auto' , textAlign:'center' , padding:'20px'}} className='d-flex flex-column'>
        <FormLabel>Email</FormLabel>
        <input type='text' id='email' required ref={emailInputRef}></input>
        <FormLabel>Password</FormLabel>
        <input type='password' id='password' required ref={passwordInputRef}></input>
        <FormLabel>Confirm Password</FormLabel>
        <input type='password' id='confirmPassword' required onChange={confirmPasswordHandler}></input>
        <Button type='submit' className='mx-5 my-2'>SignUp</Button>
      </Form>
      <NavLink to='/login'>Have an Account? Login</NavLink>
      <div>
        
        
    
      </div>
    </div>
  );
};

export default SignUp;
