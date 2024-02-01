export const getCustomers = () => {
  return fetch('/api/customers')
      .then(response => response.json())
      .catch(error => console.error('Error fetching customers:', error));
};

export const getCustomerById = (customerId) => {
  return fetch(`/api/customers/${customerId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => console.error('Error fetching customer:', error));
};
