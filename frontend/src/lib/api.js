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
    await axios.post("auth/signup", { email, password })
}

async function loginUser(email, password) {
    const res = await axios.post("auth/login" , { email, password })

    localStorage.setItem('JWT', res.data.token) 
    localStorage.setItem('user', JSON.stringify({
      id: res.data.userId,
      role: res.data.role
    })) 
}

async function sendLike(postId, like) {
  try {
    await axios.post("/post/:id/like" , {like, postId})
    return 
    
  } catch (error) {
    return error
  }
}

async function sendDelete(postId) {
  console.log(postId)
  await axios.delete('/post/:id', postId)
}

async function sendModify(postId) {
  await axios.put('/post/:id', { params: { id: postId } })
}

async function getOnePost(postId) {
  const res = await axios.get('/post/:id', postId)
  return res  
}




export { signUpUser, loginUser, sendLike, sendDelete, sendModify, getOnePost }