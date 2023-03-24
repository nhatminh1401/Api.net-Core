// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('username');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
  
  // return the token from the session storage
  export const getToken = () => {
    const getToken = sessionStorage.getItem("token");
    if (getToken) return getToken;
    else return null;
  }

  export const getRole = () => {
    const userRole = sessionStorage.getItem('role');
    if (userRole) return JSON.parse(userRole);
    else return null;
  }
  
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('username');


  }
  
  // set the token and user from the session storage
  //const value = response.data.role;

  export const setUserSession = (token, email, role, userName) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', JSON.stringify(email));
    sessionStorage.setItem('role', JSON.stringify(role));
    sessionStorage.setItem('username', JSON.stringify(userName));

  }