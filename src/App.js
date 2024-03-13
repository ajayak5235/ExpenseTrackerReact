import logo from './logo.svg';
import './App.css';
import { Routes , Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CompleteProfile from './Profile/CompleteProfile';
import ExpenseForm from './component/ExpenseForm';
import ResetPassLink from './formPass/ResetPassLink';


import { useSelector } from 'react-redux';
function App() {
  
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const isDarkMode = useSelector((state) => state.theme.isDark);
  return (
    <div 
    className={`App ${isAuth && isDarkMode ? "lightTheme " : "darkTheme"}`} >
      
     <Routes>
      {/* {<Route exact path='/login' element={<Login />}></Route>} */}
      
      <Route exact path='/' element={<SignUp />}></Route>
      <Route exact path='/login' element={<Login></Login>}></Route>
      <Route exact path='/reset-password/:oobCode' element={<ResetPassLink />}></Route>
      
     {/* <Route exact path='/Welcome' element={<Welcome />}></Route>  */}
  <Route exact path='/profile' element={<CompleteProfile />}></Route>
   { <Route exact path='/Expense' element={<ExpenseForm />}></Route>}
      
     </Routes>
   
    </div>
  );
}

export default App;





