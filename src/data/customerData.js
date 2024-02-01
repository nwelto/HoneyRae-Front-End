export const getCustomers = () => {
  return fetch('/api/customers')
      .then(response => response.json())
      .catch(error => console.error('Error fetching customers:', error));
};
