

import React, { useState, useEffect } from "react";
import { Button, Form, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../states/reducers/ExpenseReducer";
import ShowExpense from "../pages/ShowExpense";
import Welcome from "../pages/Welcome";
const ExpenseForm = () => {
    const [data, setData] = useState({ money: 0, description: '', category: '' });
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    
    // Load saved data from local storage on component mount
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("expenseData"));
        if (savedData) {
            setData(savedData);
        }
    }, []);

    const moneyHandler = (event) => {
        setData({ ...data, money: event.target.value });
    }

    const descriptionHandler = (event) => {
        setData({ ...data, description: event.target.value });
    }

    const categoryHandler = (event) => {
        setData({ ...data, category: event.target.value });
    }

    const expenseSubmit = async (event) => {
        event.preventDefault();

        const expenseData = { ...data, userId: userId };

        try {
            const response = await fetch(`https://ajay-singh-f6aa8-default-rtdb.firebaseio.com/Expense/${userId}.json`, {
                method: 'POST',
                body: JSON.stringify(expenseData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to submit expense data');
            }
            // Dispatch action to add expense to Redux store
            const responseData = await response.json();
            const expenseId = responseData.name;
    
            // Add the generated ID to the expense data
            const expenseDataWithId = { ...expenseData, id: expenseId };
    
            // Dispatch action to add expense to Redux store
            dispatch(expenseActions.addExpense(expenseDataWithId));
    

            // dispatch(expenseActions.addExpense(expenseData));

            // Clear form data after submission
            setData({ money: 0, description: '', category: '' });
        } catch (error) {
            console.error(error);
        }
    }

    // Save data to local storage whenever it changes
   
    return (<>
 <div >
            <Welcome></Welcome>
            </div>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
           
            <Form onSubmit={expenseSubmit} style={{ display: 'flex',backgroundColor:'green', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', width: '80%', margin: 'auto' }} className=" bg-red d-flex flex-row">
                <Form.Group>
                    <FormLabel>Money:</FormLabel>
                    <input type='number' id='money' value={data.money} onChange={moneyHandler} />
                </Form.Group>
                <Form.Group>
                    <FormLabel>Description:</FormLabel>
                    <input type='text' id='description' value={data.description} onChange={descriptionHandler} />
                </Form.Group>
                <Form.Group>
                    <FormLabel>Category:</FormLabel>
                    <select id='category' value={data.category} onChange={categoryHandler}>
                        <option value=''>Select Category</option>
                        <option value='travel'>Travel</option>
                        <option value='food'>Food</option>
                        <option value='shopping'>Shopping</option>
                    </select>
                </Form.Group>
                <Button type="submit" className="mx-5 d-block my-0">+Add</Button>
            </Form>
            <ShowExpense ></ShowExpense>
        </div>
    </>

    );
}

export default ExpenseForm;




