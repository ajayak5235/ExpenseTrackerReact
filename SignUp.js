import { Form ,Button, FormLabel,  } from "react-bootstrap";
import {useRef , useState} from 'react'
import {NavLink} from 'react-router-dom'
const SignUp = () =>{
const [isLogin , setIsLogin] = useState(false)

const emailInputRef = useRef()
const PasswordInputRef = useRef()

    return<div>
        <Form>
          <FormLabel>
            Email
          </FormLabel>
          <input type='text' id='email' required ref={emailInputRef}></input>
          <FormLabel>
            Password
          </FormLabel>
          <input type='text' id='password' required ref={PasswordInputRef}></input>
          <FormLabel>
            Confirm Password
          </FormLabel>
          <input type='text' id='confirmPassword' required></input>

         <Button>SignUp</Button>
        </Form>
        <NavLink>Have an Account? Login</NavLink>
    </div>
}

export default SignUp;