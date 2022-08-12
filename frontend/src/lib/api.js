const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:3000/api'
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('JWT')

async function signUpUser( email, password) {
  await axios.post("auth/signup", { email, password })
}

async function loginUser(email, password) {
  const res = await axios.post("auth/login" , { email, password })
  
  localStorage.setItem('JWT', res.data.token) 
  
    axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.token
    
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
  await axios.delete(`/post/${postId}`)
}

async function sendModify(formData, postId) {
  await axios({
    method: "put",
    url: `/post/${postId}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
})
}

export { signUpUser, loginUser, sendLike, sendDelete, sendModify }