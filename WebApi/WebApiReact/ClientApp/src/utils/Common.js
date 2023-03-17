// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.email;
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
  
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.token || null;
  }
  
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
  }
  
  // set the token and user from the session storage
  export const setUserSession = (token, email) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', JSON.stringify(email));
  }