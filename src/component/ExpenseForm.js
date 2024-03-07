

import React, { useState } from "react";
import { Button, Form, FormLabel, Table } from "react-bootstrap";
import ShowExpense from "../pages/ShowExpense";
const ExpenseForm = () => {
    const [data, setData] = useState([{ money: 0, description: '', category: '' }]);
 

    const moneyHandler = (event) => {
        setData({ ...data, money: event.target.value });
    }

    const descriptionHandler = (event) => {
        setData({ ...data, description: event.target.value });
    }

    const categoryHandler = (event) => {
        setData({ ...data, category: event.target.value });
    }

    const expenseSubmit = async(event) => {
        event.preventDefault();
        // setExpenses([...expenses, data]);
        await fetchData(data)
        setData({ money: 0, description: '', category: '' }); // Reset form fields after submission
      
        
    }
   
   async function fetchData(data){
    const response = await fetch('https://expensetracker-8e8fb-default-rtdb.firebaseio.com/Expense.json',{
        method:'POST',
        body:JSON.stringify(data),
        headers:({
            'Content-Type': 'application/json'
        })
        
    })
    
    setData({ money: 0, description: '', category: '' });
   }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Form onSubmit={expenseSubmit} style={{padding:'20px' , textAlign:'center'}} className="d-flex flex-row">
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
                <Button type="submit" className="mx-5 d-block my-0" >Submit</Button>
            </Form>
     {<ShowExpense />}



        </div>
    );
}

export default ExpenseForm;
