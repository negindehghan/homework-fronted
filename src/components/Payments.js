import React, { useState, useEffect } from 'react';
import { fetchPayments, createPayment, updatePayment, deletePayment, fetchBills } from '../services/api';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [bills, setBills] = useState([]);
    const [newPayment, setNewPayment] = useState({
        billId: '',
        amount: '',
        paymentDate: '',
        paymentMethod: 'Credit Card',
        status: 'Completed',
        notes: ''
    });

    useEffect(() => {
        loadPayments();
        loadBills();
    }, []);

    const loadPayments = async () => {
        try {
            const data = await fetchPayments();
            setPayments(data);
        } catch (error) {
            console.error('Error loading payments:', error);
        }
    };

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
            await createPayment(newPayment);
            setNewPayment({
                billId: '',
                amount: '',
                paymentDate: '',
                paymentMethod: 'Credit Card',
                status: 'Completed',
                notes: ''
            });
            loadPayments();
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePayment(id);
            loadPayments();
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    };

    return (
        <div className="payments">
            <h2>Payments</h2>
            
            <form onSubmit={handleSubmit} className="payment-form">
                <select
                    value={newPayment.billId}
                    onChange={(e) => setNewPayment({...newPayment, billId: e.target.value})}
                    required
                >
                    <option value="">Select Bill</option>
                    {bills.map(bill => (
                        <option key={bill.id} value={bill.id}>
                            {bill.billName} - ${bill.amount}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Amount"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                    required
                />
                <input
                    type="date"
                    value={newPayment.paymentDate}
                    onChange={(e) => setNewPayment({...newPayment, paymentDate: e.target.value})}
                    required
                />
                <select
                    value={newPayment.paymentMethod}
                    onChange={(e) => setNewPayment({...newPayment, paymentMethod: e.target.value})}
                >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Other">Other</option>
                </select>
                <select
                    value={newPayment.status}
                    onChange={(e) => setNewPayment({...newPayment, status: e.target.value})}
                >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                </select>
                <textarea
                    placeholder="Notes"
                    value={newPayment.notes}
                    onChange={(e) => setNewPayment({...newPayment, notes: e.target.value})}
                />
                <button type="submit">Add Payment</button>
            </form>

            <div className="payments-list">
                {payments.map(payment => (
                    <div key={payment.id} className="payment-card">
                        <h3>Payment for {bills.find(b => b.id === payment.billId)?.billName}</h3>
                        <p>Amount: ${payment.amount}</p>
                        <p>Date: {new Date(payment.paymentDate).toLocaleDateString()}</p>
                        <p>Method: {payment.paymentMethod}</p>
                        <p>Status: {payment.status}</p>
                        {payment.notes && <p>Notes: {payment.notes}</p>}
                        <button onClick={() => handleDelete(payment.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Payments; 