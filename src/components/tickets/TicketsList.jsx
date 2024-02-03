import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getServiceTickets, deleteServiceTicket, completeServiceTicket } from "../../data/serviceTicketsData"; 
import { useNavigate } from "react-router-dom";

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getServiceTickets().then(setTickets);
  }, []);

  const handleDelete = (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      deleteServiceTicket(ticketId)
        .then(() => {
          setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
        })
        .catch(error => {
          console.error('Failed to delete ticket:', error);
        });
    }
  };

  const handleComplete = (ticketId) => {
    completeServiceTicket(ticketId)
      .then(updatedTicket => {
        setTickets(prevTickets => prevTickets.map(ticket => 
          ticket.id === ticketId ? { ...ticket, dateCompleted: updatedTicket.dateCompleted } : ticket
        ));
      })
      .catch(error => console.error('Error:', error));
  };

  const goToDetails = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Description</th>
          <th>Emergency?</th>
          <th>Date Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={`ticket-${t.id}`}>
            <th scope="row">{t.id}</th>
            <td>{t.description}</td>
            <td>{t.emergency ? "Yes" : "No"}</td>
            <td>{t.dateCompleted?.split("T")[0] || "Incomplete"}</td>
            <td>
              <button onClick={() => goToDetails(t.id)} style={{marginLeft: '10px', color: 'blue'}}>Details</button>
              {!t.dateCompleted && (
                <button onClick={() => handleComplete(t.id)} style={{ marginLeft: '10px', color: 'green' }}>Complete</button>


              )}
              <button onClick={() => handleDelete(t.id)} style={{marginLeft: '10px', color: 'red'}}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
