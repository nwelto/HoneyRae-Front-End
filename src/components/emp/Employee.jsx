import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getEmployees } from '../../data/employeeData';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees().then(setEmployees);
    }, []);

    return (
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Specialty</th> 
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => (
                    <tr key={`employee-${employee.id}`}>
                        <th scope="row">{employee.id}</th>
                        <td>{employee.name}</td>
                        <td>{employee.specialty}</td> 
                        <td>
                            <Link to={`/employees/${employee.id}`}>Details</Link> 
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
