import {Container, Nav, NavLink, Navbar} from 'react-bootstrap'
import myImage from '../logo/ball.webp'
const NavBar = () =>{
return<Navbar >
   
<Container>

<Nav>

    <NavLink>ExpenseTracker</NavLink>
    <NavLink>Home</NavLink>
    <NavLink>Products</NavLink>
    <NavLink>About</NavLink>
</Nav>
</Container>

</Navbar>

}
export default NavBar;