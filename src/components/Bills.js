import React, { useState, useEffect } from 'react';
import { fetchBills, createBill, updateBill, deleteBill } from '../services/api';

const Bills = () => {
    const [bills, setBills] = useState([]);
    const [newBill, setNewBill] = useState({
        billName: '',
        amount: '',
        dueDate: '',
        category: 'Utilities',
        notes: ''
    });

    useEffect(() => {
        loadBills();
    }, []);

    const loadBills = async () => {
        try {
            const data = await fetchBills();
            setBills(data);
        } catch (error) {
            console.error('Error loading bills:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBill(newBill);
            setNewBill({
                billName: '',
                amount: '',
                dueDate: '',
                category: 'Utilities',
                notes: ''
            });
            loadBills();
        } catch (error) {
            console.error('Error creating bill:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteBill(id);
            loadBills();
        } catch (error) {
            console.error('Error deleting bill:', error);
        }
    };

    return (
        <div className="bills">
            <h2>Bills</h2>
            
            <form onSubmit={handleSubmit} className="bill-form">
                <input
                    type="text"
                    placeholder="Bill Name"
                    value={newBill.billName}
                    onChange={(e) => setNewBill({...newBill, billName: e.target.value})}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={newBill.amount}
                    onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                    required
                />
                <input
                    type="date"
                    value={newBill.dueDate}
                    onChange={(e) => setNewBill({...newBill, dueDate: e.target.value})}
                    required
                />
                <select
                    value={newBill.category}
                    onChange={(e) => setNewBill({...newBill, category: e.target.value})}
                >
                    <option value="Utilities">Utilities</option>
                    <option value="Rent">Rent</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Subscription">Subscription</option>
                    <option value="Other">Other</option>
                </select>
                <textarea
                    placeholder="Notes"
                    value={newBill.notes}
                    onChange={(e) => setNewBill({...newBill, notes: e.target.value})}
                />
                <button type="submit">Add Bill</button>
            </form>

            <div className="bills-list">
                {bills.map(bill => (
                    <div key={bill.id} className="bill-card">
                        <h3>{bill.billName}</h3>
                        <p>Amount: ${bill.amount}</p>
                        <p>Due Date: {new Date(bill.dueDate).toLocaleDateString()}</p>
                        <p>Category: {bill.category}</p>
                        <p>Status: {bill.status}</p>
                        {bill.notes && <p>Notes: {bill.notes}</p>}
                        <button onClick={() => handleDelete(bill.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bills; 