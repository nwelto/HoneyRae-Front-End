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
