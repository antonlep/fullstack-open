import Comment from './Comment'

const Blog = ({ blog, handleLikes, createComment }) => {
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
      <h3>comments</h3>
      <Comment blogObject={blog} createComment={createComment} />
      <ul>
        {blog.comments.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
