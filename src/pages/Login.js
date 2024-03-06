import {useRef, useState,useEffect} from 'react'
import { Button, Form, FormLabel } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'


const Login = (props) =>{
    const [isLogin , setIsLogin] = useState(true)
    const emailInputRef = useRef()
    const passInputRef = useRef()
    const navigate = useNavigate()

    // useEffect(() =>{
    //     if(localStorage.getItem('token') !== null){
    //         // navigate('/')
    //     }
    // })

    const submitHandler = (event) =>{
        event.preventDefault()
        const emailEntered = emailInputRef.current.value;
        const passEntered = passInputRef.current.value;

      let url;
      if(isLogin){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLPdt6hd56ixmlKEzUMU06fngO3dzpmXc'
      }else{
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLPdt6hd56ixmlKEzUMU06fngO3dzpmXc'
      }
      fetch(url,{
        method:'POST',
        body:JSON.stringify({
            email:emailEntered,
            password: passEntered,
            returnSecureToken: true
        }),
        headers:{
            'Content-Type' : 'application/json'
        }
      }).then(res => {
        if(res.ok){
            alert('Login Succefully')
            navigate('/Welcome')
            return res.json()
            
        }else{
            return res.json().then((data) =>{
                let errorMessage = 'Authentication Faild'
                throw new Error(errorMessage)
            })
        }
      }).then((data) =>{
        localStorage.setItem('token' , data.idToken);
           console.log(data.idToken)
        setTimeout(() =>{
            localStorage.removeItem('token')
            navigate('/')
            console.log('remove')
        },10000)
        
      }).catch(error => console.log(error))
    }
    return<div style={{margin:'auto', border:'5px Solid #ccc' ,borderRadius:'8px',padding:'15px', width:'20rem' , marginTop:'8%'}}>
        <Form onSubmit={submitHandler} style={{margin:'auto', padding:'15px' ,textAlign:'center', }} className='d-flex flex-column'>
            <FormLabel>
             Email
            </FormLabel>
            <input type='text' id='email' reuired ref={emailInputRef}></input>
            <FormLabel>
             Password
            </FormLabel>
            <input type='password' id='password' require ref={passInputRef}></input>
            <Button type='submit' className='mx-5 my-2'>Login</Button>
        </Form>
        <NavLink to='/signup'>Creat An Account</NavLink>
    </div>
}
export default Login;


