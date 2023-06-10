const baseURL = 'local:host3000/api'; // to be changed later



// regiser user post request
export const registerUser = async (username, password) => {
    try {
      const response = await fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
  
          username: username,
          password: password
  
        })
      })
      const result = await response.json();
  
      return result;
    } catch (error) {
      console.log('error registering user')
    }
  }

  // login user post request
  export const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${baseURL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
  
          username: username,
          password: password
  
        })
      })
      const result = await response.json();
      return result;
    } catch (error) {
      console.log('error logging in user')
    }
  }