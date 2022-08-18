import { useState } from 'react'

const Blog = ({ blog, handleLikes, deleteBlog, isUser }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const setVisible = () => {
    setInfoVisible(!infoVisible)
  }

  if (infoVisible) {
    return (
      < div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={setVisible}>hide</button><br></br>
        {blog.url}<br></br>
        likes {blog.likes} <button onClick={handleLikes}>like</button><br></br>
        {blog.user.username}<br></br>
        <div style={{ display: isUser ? '' : 'none' }}>
          <button onClick={() => deleteBlog(blog)}>delete</button>
        </div>
      </div >
    )
  } else {
    return (
      < div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={setVisible}>view</button>
      </div >
    )
  }
}

export default Blog