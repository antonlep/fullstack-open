const BlogForm = (props) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={props.addBlog}>
                title:<input
                    value={props.newBlog.title}
                    onChange={({ target }) => props.setNewBlog({ ...props.newBlog, title: target.value })}
                /><br></br>
                author:<input
                    value={props.newBlog.author}
                    onChange={({ target }) => props.setNewBlog({ ...props.newBlog, author: target.value })}
                /><br></br>
                url:<input
                    value={props.newBlog.url}
                    onChange={({ target }) => props.setNewBlog({ ...props.newBlog, url: target.value })}
                /><br></br>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
