
import React, { useState, useEffect } from "react";
import { Table, Spinner, Button, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../states/reducers/ExpenseReducer";
import { authActions } from "../states/reducers/AuthReducer";
import { themeActions } from "../states/reducers/theme-slice";

const ShowExpense = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth);

  const expenses = useSelector((state) => state.expenses.expenses);
  console.log('>>>> expense' , expenses)
  const [obj, setObj] = useState([]);
console.log('>>>obj', obj)
  const userId = useSelector((state) => state.auth.userId);

  const [loading, setLoading] = useState(true);
  const [selectedExpenseIndex, setSelectedExpenseIndex] = useState(null); // Define selectedExpenseIndex
  const [showEditModal, setShowEditModal] = useState(false); // Define showEditModal
  const [editedExpense, setEditedExpense] = useState({
    // Define editedExpense
    money: 0,
    description: "",
    category: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://ajay-singh-f6aa8-default-rtdb.firebaseio.com/Expense.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data from the server");
        }

        const data = await response.json();
      


  


  const obj = [];
Object.keys(data).forEach((item) => {
  Object.keys(data[item]).forEach((key) => {
    obj.push({ [key]: data[item][key] });
  });
});

console.log('> obj', obj);
 setObj(obj);


////////////////////
        if (!data || typeof data !== "object") {
          throw new Error("Invalid data received from the server");
        }

        let allExpenses = [];

        Object.keys(data).forEach((userId) => {
          const userExpenses = Object.values(data[userId]);

          allExpenses = allExpenses.concat(userExpenses);
        });

        console.log(">>>>>>>  expenseArray", allExpenses);

        let filteredExpenses = allExpenses.filter(
          (item) => item.userId === userId
        );
        // Update expen state with filtered expenses

        // Dispatch the action to update Redux state
        dispatch(expenseActions.fetchExpenses(filteredExpenses));
     
        ////////////////////
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, userId]);

///////////////////////////

const deleteHandler = async (index) => {
  try {
    if (!obj || obj.length === 0) {
      console.error("Expense list is empty");
      return;
    }
    const expenseKey = Object.keys(obj[index]); 

    console.log('Deleting expense:', obj[index]);
    console.log('Expense key:', expenseKey);

    const response = await fetch(
      `https://ajay-singh-f6aa8-default-rtdb.firebaseio.com/Expense/${userId}/${expenseKey}.json`,
      {
        method: "DELETE",
      }
    );
    const res = await response.json();
    console.log(">>>>>>", res);
    if (!response.ok) {
      throw new Error("Failed to delete expense from the server");
    }

    console.log("Expense deleted successfully");

   
    dispatch(expenseActions.deleteExpense(index));
setObj(obj[index])

    const deletedExpense = expenses.find((expense) => expense.id === index);
    if (deletedExpense) {
      dispatch(expenseActions.addExpense(deletedExpense));
      setObj(obj[index])
    }
  } catch (error) {
    console.error(error);
  }
};














  if (loading) {
    return <Spinner animation="border" />;
  }

  const editHandler = (index) => {
    setSelectedExpenseIndex(index);
   
    setEditedExpense(expenses[index]);
    setShowEditModal(true);
  };

  const updateHandler = async () => {
    try {
      const response = await fetch(
        `https://ajay-singh-f6aa8-default-rtdb.firebaseio.com/Expense/${editedExpense.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(editedExpense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update expense in the server");
      }
      console.log("Expense updated successfully");

      const updatedExpenses = [...expenses];
      updatedExpenses[selectedExpenseIndex] = editedExpense;
      dispatch(expenseActions.fetchExpenses(updatedExpenses)); // Update Redux state with updated expenses

      setShowEditModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const clickActPremiumHandler = async () => {
    try {
      // Update the isPremium value in Firebase
      const resFirebase = await fetch(
        `https://expensetracker-8e8fb-default-rtdb.firebaseio.com/${userId}.json`,
        {
          method: "POST", 
          body: JSON.stringify({ isPremium: true }), // Send the updated value directly
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    
      if (!resFirebase.ok) {
        throw new Error("Failed to update premium status in Firebase");
      }
      console.log("Premium status updated successfully in Firebase");

      // Dispatch action to update Redux state
      dispatch(authActions.setIsPremium({ isPremium: true }));
      localStorage.setItem("isPremium", true); // Update local storage
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const themeHandler = () => {
    dispatch(themeActions.toggelTheme());
  };

  const clickDownloadHandler = () => {
    const generateCSV = (itemsArr) => {
      const csvRows = [];
      const headers = ["Description", "Category", "Money"]; // Corrected headers
      csvRows.push(headers.join(","));

      itemsArr.forEach((item) => {
        const row = [
          item.description, // Corrected property name
          item.category,
          item.money, // Corrected property name
        ];
        csvRows.push(row.join(","));
      });

      return csvRows.join("\n");
    };

    const csvContent = generateCSV(expenses);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "expenses.csv";
    downloadLink.click();
  };

  // Calculate total expense
  const totalExpense = expenses.reduce(
    (total, item) => total + parseFloat(item.money),
    0
  );

  return (
    <div>
      <div
        style={{
          display: "flex ",
          textAlign: "center",
          margin: "15px",
          padding: "20px",
        }}
        className="d-flex flex-row"
      >
        <h2>
          Total Expense <span>Rs:{totalExpense}</span>
        </h2>

        <div style={{ justifyContent: "space-between" }}>
          {totalExpense >= 10000 && (
            <>
              {!isAuth.isPremium ? (
                <Button
                  className="mx-5"
                  variant="danger"
                  onClick={clickActPremiumHandler}
                >
                  Activate Premium
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    className="mx-5"
                    onClick={themeHandler}
                  >
                    Theme Change
                  </Button>
                  <Button variant="warning" onClick={clickDownloadHandler}>
                    Download List
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div >
          <Table style={{ width: "100%", textAlign: "center" }}>
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

              {expenses.map((items, index) =>{
                
              return <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{items.money}</td>
                  <td>{items.description}</td>
                  <td>{items.category}</td>
                <div style={{display:'flex' , justifyContent:'space-between'}}>
                <td >
                    
                    <Button
                      variant="primary"
                      
                      onClick={() => editHandler(index)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      
                      onClick={() => deleteHandler(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </div>
                  
                </tr>
})}
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
              <Form.Control
                type="number"
                placeholder="Enter money"
                name="money"
                value={editedExpense.money}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                name="description"
                value={editedExpense.description}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                name="category"
                value={editedExpense.category}
                onChange={handleEditInputChange}
              />
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
    </div>
  );
};

export default ShowExpense;
