const API_URL = 'http://localhost:3000/api';

export const fetchBills = async () => {
    const response = await fetch(`${API_URL}/bills`);
    if (!response.ok) throw new Error('Failed to fetch bills');
    return response.json();
};

export const createBill = async (billData) => {
    const response = await fetch(`${API_URL}/bills`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData),
    });
    if (!response.ok) throw new Error('Failed to create bill');
    return response.json();
};

export const updateBill = async (id, billData) => {
    const response = await fetch(`${API_URL}/bills/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData),
    });
    if (!response.ok) throw new Error('Failed to update bill');
    return response.json();
};

export const deleteBill = async (id) => {
    const response = await fetch(`${API_URL}/bills/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete bill');
};

export const fetchPayments = async () => {
    const response = await fetch(`${API_URL}/payments`);
    if (!response.ok) throw new Error('Failed to fetch payments');
    return response.json();
};

export const createPayment = async (paymentData) => {
    const response = await fetch(`${API_URL}/payments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
    });
    if (!response.ok) throw new Error('Failed to create payment');
    return response.json();
};

export const updatePayment = async (id, paymentData) => {
    const response = await fetch(`${API_URL}/payments/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
    });
    if (!response.ok) throw new Error('Failed to update payment');
    return response.json();
};

export const deletePayment = async (id) => {
    const response = await fetch(`${API_URL}/payments/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete payment');
};

export const fetchDashboardSummary = async () => {
    const response = await fetch(`${API_URL}/dashboard/summary`);
    if (!response.ok) throw new Error('Failed to fetch dashboard summary');
    return response.json();
}; 