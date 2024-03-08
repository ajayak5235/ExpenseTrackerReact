
import React, { useState, useEffect } from "react";
import { Table, Spinner, Button, Modal, Form } from "react-bootstrap";

const ShowExpense = ({ userId }) => {

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedExpenseIndex, setSelectedExpenseIndex] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedExpense, setEditedExpense] = useState({
        money: 0,
        description: "",
        category: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://expensetracker-8e8fb-default-rtdb.firebaseio.com/Expense.json?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data from the server');
                }

                const data = await response.json();
                const expenseKeys = Object.keys(data);
                const expensesArray = expenseKeys.map(key => ({
                    id: key,
                    ...data[key]
                }));
                setExpenses(expensesArray);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]); 

    const editHandler = (index) => {
        setSelectedExpenseIndex(index);
        setEditedExpense(expenses[index]);
        setShowEditModal(true);
    };

    const updateHandler = async () => {
        try {
            const response = await fetch(`https://expensetracker-8e8fb-default-rtdb.firebaseio.com/Expense/${selectedExpenseIndex}.json`, {
                method: 'PUT',
                body: JSON.stringify(editedExpense),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to update expense in the server');
            }
            console.log("Expense updated successfully");

            const updatedExpenses = [...expenses];
            updatedExpenses[selectedExpenseIndex] = editedExpense;
            setExpenses(updatedExpenses);

            setShowEditModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setEditedExpense(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const deleteHandler = async (index) => {
        try {
            const expenseId = expenses[index].id;
            const response = await fetch(`https://expensetracker-8e8fb-default-rtdb.firebaseio.com/Expense/${expenseId}.json`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete expense from the server');
            }
            console.log("Expense deleted successfully");

            const updatedExpenses = [...expenses];
            updatedExpenses.splice(index, 1);
            setExpenses(updatedExpenses);
        } catch (error) {
            console.error(error);
        }
    };

    // Calculate total expense
    const totalExpense = expenses.reduce((total, item) => total + parseFloat(item.money), 0);

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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((items, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{items.money}</td>
                                    <td>{items.description}</td>
                                    <td>{items.category}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => editHandler(index)}>Edit</Button>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => deleteHandler(index)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formMoney">
                            <Form.Label>Money</Form.Label>
                            <Form.Control type="number" placeholder="Enter money" name="money" value={editedExpense.money} onChange={handleEditInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" name="description" value={editedExpense.description} onChange={handleEditInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter category" name="category" value={editedExpense.category} onChange={handleEditInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateHandler}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {totalExpense >= 10000 && (
                <Button variant="success" className="mt-3">Activate Premium</Button>
            )}
        </div>
    );
}

export default ShowExpense;
