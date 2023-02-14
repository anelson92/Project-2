//Function to login to the website
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    //Variables for login form
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#pwd').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, go to users profile else send failed login alert
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  //Function to signup to the website
  const signupFormHandler = async (event) => {
    event.preventDefault();
    
    //Variables for the signup form
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signuppwd').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/user/', { 
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document.querySelector('.login-card').addEventListener('submit', loginFormHandler);
  
  document.querySelector('.signup-card').addEventListener('submit', signupFormHandler);
  