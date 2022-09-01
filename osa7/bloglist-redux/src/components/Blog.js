const Blog = ({ blog, handleLikes }) => {
  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      url <a href={blog.url}>{blog.url}</a>
      <br></br>
      likes {blog.likes} <button onClick={handleLikes}>like</button>
      <br></br>
      added by {blog.user.username}
    </div>
  )
}

export default Blog
