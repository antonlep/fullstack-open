import { useState } from 'react'

const Comment = ({ blogObject, createComment }) => {
  const [newComment, setNewComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    createComment(blogObject, newComment)
    setNewComment('')
  }

  return (
    <div>
      <form onSubmit={addComment}>
        <input
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <button type="submit">add a comment</button>
      </form>
    </div>
  )
}

export default Comment
