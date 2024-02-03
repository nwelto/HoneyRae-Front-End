import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById } from '../../data/employeeData'; 

const EmployeeDetails = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getEmployeeById(employeeId)
            .then(fetchedEmployee => {
                setEmployee(fetchedEmployee);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, [employeeId]);

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

    if (!employee) {
        return <p>Employee not found.</p>;
    }

    const completedTickets = employee.serviceTickets.filter(ticket => ticket.dateCompleted);
    const openTickets = employee.serviceTickets.filter(ticket => !ticket.dateCompleted);

    return (
        <div>
            <h2>Employee Details</h2>
            <p>ID: {employee.id}</p>
            <p>Name: {employee.name}</p>
            <p>Specialty: {employee.specialty}</p> 

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

            {employee.serviceTickets.length === 0 && <p>No service tickets assigned.</p>}
        </div>
    );
};

export default EmployeeDetails;
