

import { useRef, useState } from 'react';
import { Button, Form, FormLabel } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../states/reducers/AuthReducer'; // Import only the login action
import Welcome from './Welcome';
// Inside your submitHandler function



const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    const emailEntered = emailInputRef.current.value;
    const passEntered = passInputRef.current.value;

    try {
      const url = isLogin
        ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLPdt6hd56ixmlKEzUMU06fngO3dzpmXc'
        : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLPdt6hd56ixmlKEzUMU06fngO3dzpmXc';

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: emailEntered,
          password: passEntered,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      const { idToken, localId } = data; // Extract user ID from response data
      localStorage.setItem('token', idToken);


      dispatch(login({ tokenId: data.idToken, userId: data.localId })); // Dispatch the login action

      console.log(idToken);
      setTimeout(() => {
        localStorage.removeItem('token');
        console.log('Token removed');
      }, 3000000);

      alert('Login Successfully');
        
      navigate('/Expense'); // Redirect to Welcome page after successful login
    } catch (error) {
      console.error(error);
      alert('Authentication failed');
    }
  };

  return (
    <div style={{ margin: 'auto', border: '5px solid #ccc', borderRadius: '8px', padding: '15px', width: '20rem', marginTop: '8%' }}>
      <Form onSubmit={submitHandler} style={{ margin: 'auto', padding: '15px', textAlign: 'center' }} className="d-flex flex-column">
        <FormLabel>Email</FormLabel>
        <input type="text" id="email" required ref={emailInputRef} />
        <FormLabel>Password</FormLabel>
        <input type="password" id="password" required ref={passInputRef} />
        <Button type="submit" className="mx-5 my-2">Login</Button>
        <NavLink to="/reset-password/:oobCode">Reset Password</NavLink>
      </Form>
      <NavLink to="/">Create An Account</NavLink>
    </div>
  );
};

export default Login;
