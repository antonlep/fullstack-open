import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: ''
    })

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url
        }
        createBlog(blogObject)
        setNewBlog({
            title: '',
            author: '',
            url: ''
        })
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                title:<input
                    value={newBlog.title}
                    onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
                    id='blog-title'
                /><br></br>
                author:<input
                    value={newBlog.author}
                    onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
                    id='blog-author'
                /><br></br>
                url:<input
                    value={newBlog.url}
                    onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
                    id='blog-url'
                /><br></br>
                <button type="submit" id='submit-button'>create</button>
            </form>
        </div>
    )
}

export default BlogForm
