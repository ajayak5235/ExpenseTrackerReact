
import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    expenses: [],
    loading: true
};

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: initialExpenseState,
    reducers: {
        addExpense(state, action) {
            const newExpense = { ...action.payload,  }; // Generate a unique id
            console.log('>>>>>>addExpense', newExpense)
            state.expenses.push(newExpense);
        },
        editExpense(state, action) {
            const { id, updatedExpense } = action.payload;
            const index = state.expenses.findIndex(expense => expense.id === id);
            if (index !== -1) {
                state.expenses[index] = updatedExpense;
            }
        },
     
         deleteExpense(state, action) {
            const index = action.payload;
            console.log('>>>. index', index)
            state.expenses.splice(index, 1); // Remove the expense at the specified index
        }
        ,
        fetchExpenses(state, action) {
            state.expenses = action.payload;
            state.loading = true; // Set loading to false when expenses are fetched
        },
        
    }
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;




