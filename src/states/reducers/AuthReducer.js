




import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
    const storedState = localStorage.getItem('authState');
    if (storedState) {
        return JSON.parse(storedState);
    } else {
        return {
            isAuthenticated: false,
            isPremium: localStorage.getItem('isPremium') === "true", 
            token: null,
            userId: null
        };
    }
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: loadInitialState(),
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.tokenId;
            state.userId = action.payload.userId;
            localStorage.setItem('authState', JSON.stringify(state));
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.userId = null;
            state.isPremium = false; // Ensure isPremium is initialized
            localStorage.removeItem('authState');
            localStorage.removeItem('isPremium');
            localStorage.removeItem('isDark');
        },
        setUserId(state, action) {
            state.userId = action.payload.userId;
        },
        setIsPremium(state, action) {
            state.isPremium = action.payload.isPremium; // Update isPremium based on payload
            console.log(state.isPremium); // Log the updated isPremium value
            localStorage.setItem('isPremium', state.isPremium)
        }
    }
});


export const { login, logout, setUserId ,setIsPremium} = authSlice.actions;
export const authActions = authSlice.actions;

export const selectUserId = state => state.auth.userId;

export default authSlice.reducer;

