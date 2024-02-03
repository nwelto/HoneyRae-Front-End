const _apiBase = "/api/employees";

export const getEmployees = () => {
  return fetch(_apiBase)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .catch(error => console.error('Error fetching employees:', error));
};

export const getEmployeeById = (employeeId) => {
  return fetch(`${_apiBase}/${employeeId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .catch(error => console.error('Error fetching employee:', error));
};
