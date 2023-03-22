// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('email');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
  
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }
  
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
  }
  
  // set the token and user from the session storage
  export const setUserSession = (token, email, role) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', JSON.stringify(email));
    sessionStorage.setItem('role', JSON.stringify(role));
  }