import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const like = async (blogObject) => {
  const updatedBlog = {
    title: blogObject.title,
    author: blogObject.author,
    url: blogObject.url,
    likes: blogObject.likes + 1,
    user: blogObject.user.id,
  }

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    baseUrl + '/' + blogObject.id,
    updatedBlog,
    config
  )
  return response.data
}

const remove = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(baseUrl + '/' + blogObject.id, config)
  return blogObject
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, like, remove }
