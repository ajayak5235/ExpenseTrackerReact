

// import React, { useState, useEffect } from "react";
// import { Table } from "react-bootstrap";

// const ShowExpense = () => {
//     const [expenses, setExpenses] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('https://expensetracker-8e8fb-default-rtdb.firebaseio.com/Expense.json');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data from the server');
//                 }
//                 const data = await response.json();
//                 if (data) {
//                     const expensesArray = Object.values(data);
//                     setExpenses(expensesArray);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchData();
//     }, []); // Empty dependency array ensures useEffect runs only once when component mounts

//     return (
//         <div>
//             <div className="d-flex">
//                 <Table style={{ width: '80%', textAlign: 'center' }}>
//                     <thead>
//                         <tr>
//                             <th>Sr.No</th>
//                             <th>Money</th>
//                             <th>Description</th>
//                             <th>Category</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {expenses.map((items, index) => (
//                             <tr key={index}>
//                                 <td>{index+1}</td>
//                                 <td>{items.money}</td>
//                                 <td>{items.description}</td>
//                                 <td>{items.category}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </div>
//         </div>
//     );
// }

// export default ShowExpense;


import React, { useState, useEffect } from "react";
import { Table, Spinner } from "react-bootstrap";

const ShowExpense = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://expensetracker-8e8fb-default-rtdb.firebaseio.com/Expense.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data from the server');
                }
                const data = await response.json();
                if (data) {
                    const expensesArray = Object.values(data);
                    setExpenses(expensesArray);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures useEffect runs only once when component mounts
    
    return (
        <div>
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
                <div className="d-flex">
                    <Table style={{ width: '80%', textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Money</th>
                                <th>Description</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((items, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{items.money}</td>
                                    <td>{items.description}</td>
                                    <td>{items.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
}

export default ShowExpense;
