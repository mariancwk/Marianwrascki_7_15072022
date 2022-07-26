const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:3000/api'
axios.defaults.headers.common['Authorization'] = "Baerer " + localStorage.getItem('JWT')

// axios.interceptors.response.use(function (res) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     return res;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
     
//     return Promise.reject(error);
//   });

async function signUpUser( email, password) {

  try {
    const res = await axios.post("auth/signup", { email, password })
    console.log(res.data)

  } catch (error) {
    return error
  }
}

async function loginUser(email, password) {
  try {
    const res = await  axios.post("auth/login" , { email, password })
    return localStorage.setItem('JWT', res.data.token) 
    
  } catch (error) {
    return error
  }
}


export { signUpUser, loginUser }