
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../states/reducers/AuthReducer";
import { useDispatch } from "react-redux";

const Welcome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token  = localStorage.getItem('token')
    const logoutHandler = () => {
        // Add any additional logic you need for logout here
        console.log("Logging out...");

        // Dispatch the logout action
        dispatch(logout());
        // dispatch(expenseActions.setItemsEmpty());
        // Navigate to the login page
        navigate('/login');
    };

const VerifyEmail = async() =>{
    try{

    
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCLPdt6hd56ixmlKEzUMU06fngO3dzpmXc',{
        method:'POST',
        body:JSON.stringify({
            requestType:'VERIFY_EMAIL',
            idToken: token
        }),
        headers:{
        'Content-Type' : 'application/json'
        }
    })
    if(!response.ok){
        throw new Error('Faild to Email Verification')
    }
    console.log('Email Verification code sent ')
}catch(error){
    console.log('Error Sending Email Verification', error)
}
}



    return (
        //     <Navbar className="bg-dark" style={{justifyContent:'space-between'}}>
        //  <div style={{margin:'auto', padding:'20px', justifyContent:'space-between'}} className=" d-flex flex-row">
        //     <p style={{color:'white'}}>Welcome To Expense Tracker!</p>
        //     <div style={{ backgroundColor:'#ccc', borderRadius: '15px', border: '2px solid white', width:'auto' }} className="d-flex flex-row">
        //         <p>Your profile is incomplete</p>
        //         <NavLink to='/profile'>Complete now</NavLink>
        //     </div>
        //     <div>
        //         <Button onClick={logoutHandler}>Logout</Button>
        //     </div>
        // </div>
        //     </Navbar>
    
<Navbar className="bg-dark">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <p style={{ color: 'white', margin: '0' }}>Welcome To Expense Tracker!</p>
                <div style={{ backgroundColor: '#ccc', borderRadius: '15px', border: '2px solid white', padding: '5px 10px' }}>
                    <p style={{ margin: '0' }}>Your profile is incomplete</p>
                    <NavLink to='/profile' style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>Complete now</NavLink>
                </div>
                <Button onClick={logoutHandler} variant="danger">Logout</Button>
            </div>
        </Navbar>


    );
};

export default Welcome;
