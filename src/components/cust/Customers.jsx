import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { getCustomers } from '../../data/customerData'; 

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers().then(setCustomers);
    }, []);

    return (
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => (
                    <tr key={`customer-${customer.id}`}>
                        <th scope="row">{customer.id}</th>
                        <td>{customer.name}</td>
                        <td>{customer.address}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
