import { useDispatch, useSelector } from "react-redux";

import {Inc, Dec} from '../states/reducers/index'
const ReduxState = () =>{

    const currState = useSelector((state) => state.number)
    const dispatch = useDispatch()
    return <>
    <h1>React Redux</h1>
    <div style={{width:'100%',display:'flex', alignItems:'center',flexDirection:'column'}}>
        <h1>{currState}</h1>
        <div>
        <button onClick={() => dispatch(Inc(5))}>Inc</button>
        <button onClick={() => dispatch(Dec(5))}>Dec</button>
        </div>
  
    </div>
    </>
}
export default ReduxState;