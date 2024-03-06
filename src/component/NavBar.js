

import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
  
  const navigate = useNavigate();

  const logoutHandler = () =>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>
      { (
        <Navbar  className='bg-dark'>
          <Container>
            <Nav className="align-items-center">
               <NavLink>ExpenseTracker</NavLink>
               <NavLink className="mx-lg-2 mx-sm-3">Home</NavLink>
               <NavLink className="mx-lg-2 mx-sm-3">Products</NavLink>
               <NavLink className="mx-lg-2 mx-sm-3">About</NavLink>
               <NavLink to='/login' className="mx-lg-2 mx-sm-3">Login</NavLink>
               <button onClick={logoutHandler} className="btn btn-link mx-lg-2 mx-sm-3">Logout</button>
            </Nav>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default NavBar;

