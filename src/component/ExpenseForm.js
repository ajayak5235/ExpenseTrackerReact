// import { useState } from "react"
// import { Form, FormLabel } from "react-bootstrap"
// const ExpenseForm = () =>{

// const [data , setData] = useState([{money:0, description:'', category:''}])
// const [expense , setExpense] = useState([])
// const moneyHandler = (event) =>{
// event.preventDefault()
// const t = event.target.value;
// setData({...data , money:t})
// }

// const descriptionHandler = (event) =>{
// event.preventDefault()
// const t = event.target.value;
// setData({...data, description:t})
// }
// const categoryHandler = (event) =>{
// event.preventDefault()
// const t = event.target.value;

// setData({...data, category:t})
// setExpense([...expense , data])
// }

// const expenseSubmit = (event) =>{
// event.preventDefault()

// }

//     return <div>
           


// <Form onSubmit={expenseSubmit}>
//                 <Form.Group>
//                     <FormLabel>Money:</FormLabel>
//                     <input type='number' id='money' value={data.money} onChange={moneyHandler} />
//                 </Form.Group>
//                 <Form.Group>
//                     <FormLabel>Description:</FormLabel>
//                     <input type='text' id='description' value={data.description} onChange={descriptionHandler} />
//                 </Form.Group>
//                 <Form.Group>
//                     <FormLabel>Category:</FormLabel>
//                     <select id='category' value={data.category} onChange={categoryHandler}>
//                         <option value=''>Select Category</option>
//                         <option value='travel'>Travel</option>
//                         <option value='food'>Food</option>
//                         <option value='shopping'>Shopping</option>
//                     </select>
//                 </Form.Group>
//                 <button type="submit">Submit</button>
//             </Form>


//             {
//                 expense.map((items , index) =>{
//                     return (
//                         <div>
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>Money</th>
//                                         <th>Description</th>
//                                         <th>Category</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody key={index}>
//                                     <th>{items.money}</th>
//                                     <th>{items.description}</th>
//                                     <th>{items.category}</th>
//                                 </tbody>
//                             </table>
//                         </div>
//                     )
//                 })
//             }
//     </div>
// }

// export default ExpenseForm


import React, { useState } from "react";
import { Form, FormLabel } from "react-bootstrap";

const ExpenseForm = () => {
    const [data, setData] = useState([{ money: 0, description: '', category: '' }]);
    const [expenses, setExpenses] = useState([]);

    const moneyHandler = (event) => {
        setData({ ...data, money: event.target.value });
    }

    const descriptionHandler = (event) => {
        setData({ ...data, description: event.target.value });
    }

    const categoryHandler = (event) => {
        setData({ ...data, category: event.target.value });
    }

    const expenseSubmit = (event) => {
        event.preventDefault();
        setExpenses([...expenses, data]);
        setData({ money: 0, description: '', category: '' }); // Reset form fields after submission
    }

    return (
        <div>
            <Form onSubmit={expenseSubmit}>
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
                <button type="submit">Submit</button>
            </Form>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Money</th>
                            <th>Description</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr key={index}>
                                <td>{expense.money}</td>
                                <td>{expense.description}</td>
                                <td>{expense.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ExpenseForm;
