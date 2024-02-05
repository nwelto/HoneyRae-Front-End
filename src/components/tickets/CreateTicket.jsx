import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createServiceTicket } from '../../data/serviceTicketsData';
import { getEmployees } from '../../data/employeeData';
import { getCustomers } from '../../data/customerData';

function CreateTicket() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [emergency, setEmergency] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    getCustomers().then(setCustomers).catch(error => console.error('Fetching customers:', error));
    getEmployees().then(setEmployees).catch(error => console.error('Fetching employees:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketData = {
      description,
      emergency,
      customerId: parseInt(selectedCustomer, 10),
      employeeId: selectedEmployee ? parseInt(selectedEmployee, 10) : null,
    };

    try {
      await createServiceTicket(ticketData);
      navigate('/tickets'); 
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div>
      <h2>Create Service Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={emergency}
              onChange={(e) => setEmergency(e.target.checked)}
            />
            Emergency
          </label>
        </div>
        <div>
          <label htmlFor="customer">Customer:</label>
          <select
            id="customer"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            required
          >
            <option value="">Select a Customer</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="employee">Employee:</label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select an Employee (Optional)</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>{employee.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateTicket;
