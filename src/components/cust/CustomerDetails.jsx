import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerById } from '../../data/customerData';

const CustomerDetails = () => {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCustomerById(customerId)
            .then(fetchedCustomer => {
                setCustomer(fetchedCustomer);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, [customerId]);

    const renderTicketListItem = (ticket) => {
        const ticketStyle = ticket.emergency ? { color: 'red' } : {};
        const status = ticket.dateCompleted ? 'Completed' : ticket.emergency ? 'Open - Emergency' : 'Open - Standard';
        return (
            <li key={ticket.id} style={ticketStyle}>
                {ticket.description} - Status: {status}
            </li>
        );
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!customer) {
        return <p>Customer not found.</p>;
    }

    const completedTickets = customer.serviceTickets.filter(ticket => ticket.dateCompleted);
    const openTickets = customer.serviceTickets.filter(ticket => !ticket.dateCompleted);

    return (
        <div>
            <h2>Customer Details</h2>
            <p>ID: {customer.id}</p>
            <p>Name: {customer.name}</p>
            <p>Address: {customer.address}</p>

            {openTickets.length > 0 && (
                <>
                    <h3>Open Service Tickets:</h3>
                    <ul>
                        {openTickets.map(renderTicketListItem)}
                    </ul>
                </>
            )}

            {completedTickets.length > 0 && (
                <>
                    <h3>Completed Service Tickets:</h3>
                    <ul>
                        {completedTickets.map(renderTicketListItem)}
                    </ul>
                </>
            )}

            {customer.serviceTickets.length === 0 && <p>No service tickets available.</p>}
        </div>
    );
};

export default CustomerDetails;
