const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:3000/api'
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('JWT')

// Send a request to create a user account 
async function signUpUser( email, password) {
  await axios.post("auth/signup", { email, password })
}

// Send a request to log a user to his account 
async function loginUser(email, password) {
  const res = await axios.post("auth/login" , { email, password })
  
  localStorage.setItem('JWT', res.data.token) 
  
    axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.token
    
    localStorage.setItem('user', JSON.stringify({
      id: res.data.userId,
      role: res.data.role
    })) 
  }

// Send a request to like a post 
async function sendLike(postId, like) {
  try {
    await axios.post("/post/:id/like" , {like, postId})
    return 
    
  } catch (error) {
    return error
  }
}

// Send a request to delete a post 
async function sendDelete(postId) {
  await axios.delete(`/post/${postId}`)
}

// Send a request to modify a post 
async function sendModify(formData, postId) {
  await axios({
    method: "put",
    url: `/post/${postId}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
})
}

export { signUpUser, loginUser, sendLike, sendDelete, sendModify }