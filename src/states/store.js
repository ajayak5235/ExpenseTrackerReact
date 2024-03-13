import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './reducers/theme-slice'

import AuthReducer from "./reducers/AuthReducer";
import ExpenseReducer from "./reducers/ExpenseReducer";
const store =  configureStore({
    reducer:{
        auth:AuthReducer, expenses:ExpenseReducer , theme:themeReducer
    }
})

export default store;