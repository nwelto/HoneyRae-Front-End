const _apiUrl = "/api/servicetickets";

export const getServiceTickets = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

//export a function here that gets a ticket by id
export const getServiceTicketById = (ticketId) => {
  return fetch(`${_apiUrl}/${ticketId}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok');
  })
  .catch(error => console.error('Error fetching ticket:', error));
};


export const deleteServiceTicket = (ticketId) => {
  return fetch(`${_apiUrl}/${ticketId}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  })
  .catch(error => console.error('Error deleting ticket:', error));
};

export const completeServiceTicket = (ticketId) => {
  return fetch(`/api/servicetickets/complete/${ticketId}`, {
    method: 'PATCH', 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to mark ticket as complete');
    }
    return response.json();
  })
  .catch(error => console.error('Error completing ticket:', error));
};

export const createServiceTicket = (ticketData) => {
  return fetch('/api/servicetickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticketData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to create service ticket');
    }
    return response.json(); 
  })
  .catch(error => console.error('Error creating service ticket:', error));
};
