import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const title = container.querySelector('#blog-title')
    const author = container.querySelector('#blog-author')
    const url = container.querySelector('#blog-url')
    const sendButton = screen.getByText('create')

    await user.type(title, 'a form')
    await user.type(author, 'typetype')
    await user.type(url, 'google.fi')
    await user.click(sendButton)

    expect(createBlog.mock.calls[0][0].title).toBe('a form')
    expect(createBlog.mock.calls[0][0].author).toBe('typetype')
    expect(createBlog.mock.calls[0][0].url).toBe('google.fi')
})