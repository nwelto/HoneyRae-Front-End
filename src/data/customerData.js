const _apiBase = "/api/customers";

export const getCustomers = () => {
  return fetch(_apiBase)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .catch(error => console.error('Error fetching customers:', error));
};

export const getCustomerById = (customerId) => {
  return fetch(`${_apiBase}/${customerId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .catch(error => console.error('Error fetching customer:', error));
};
