const getBaseUrl = () => {
    let url;
    switch(process.env.NODE_ENV) {
      case 'deparment':
        url = 'https://localhost:5001/api/Department/GetDepartment';
        break;
      case 'development':
      default:
        url = 'https://google.com';
    }
  
    return url;
  }
  
  export default axios.create({
    baseURL: getBaseUrl(),
  });