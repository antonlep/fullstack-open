import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author, not likes or url', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'qwer',
        url: 'www.google.fi',
        likes: 10101
    }

    render(<Blog blog={blog} />)

    const element1 = screen.getByText(
        'Component testing is done with react-testing-library',
        { exact: false }
    )
    const element2 = screen.getByText(
        'qwer',
        { exact: false }
    )

    const element3 = screen.queryByText(
        'www.google.fi'
    )

    const element4 = screen.queryByText(
        '10101'
    )

    expect(element1).toBeDefined()
    expect(element2).toBeDefined()
    expect(element3).toBeNull()
    expect(element4).toBeNull()
})


test('clicking the button renders likes and url', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'qwer',
        url: 'www.google.fi',
        likes: 10101,
        user: { username: 'asdf' }
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    render(<Blog blog={blog} />)

    const element3 = screen.getByText(
        'www.google.fi',
        { exact: false }
    )

    const element4 = screen.getByText(
        '10101',
        { exact: false }
    )

    expect(element3).toBeDefined()
    expect(element4).toBeDefined()
})

test('clicking the like button twice calls event handler twice', async () => {

    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'qwer',
        url: 'www.google.fi',
        likes: 10101,
        user: { username: 'asdf' }
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLikes={mockHandler} />)

    const user = userEvent.setup()
    const button1 = screen.getByText('view')
    await user.click(button1)
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})