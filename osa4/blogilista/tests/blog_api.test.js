const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'asdf',
        author: 'qwer',
        url: 'zxcv',
        likes: 4
    },
    {
        title: 'asdf2',
        author: 'qwer2',
        url: 'zxcv2',
        likes: 5
    },
    {
        title: 'asdf3',
        author: 'qwer3',
        url: 'zxcv3',
        likes: 6
    }
]

let token = ''

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
    await User.deleteMany({})
    await api
        .post('/api/users')
        .send({ username: 'aaa', password: 'www' })

    const res = await api
        .post('/api/login')
        .send({ username: 'aaa', password: 'www' })
        .expect(200)

    token = 'bearer ' + res.body.token
})

describe('when there are initial blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const title = response.body.map(r => r.title)
        const author = response.body.map(r => r.author)

        expect(title).toContain('asdf3')
        expect(author).toContain('qwer3')
    })

    test('id field is correct', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

})

describe('addition of a new blog', () => {

    test('succeeds if blog is correct ', async () => {
        const newBlog = {
            title: 'wert',
            author: 'erty',
            url: 'rtyu',
            likes: 9
        }

        await api
            .post('/api/blogs')
            .set({ Authorization: token })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await Blog.find({})
        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

        const title = blogsAtEnd.map(r => r.title)
        const author = blogsAtEnd.map(r => r.author)

        expect(title).toContain('wert')
        expect(author).toContain('erty')
    })

    test('fails with 401 if token not included', async () => {
        const newBlog = {
            title: 'wert',
            author: 'erty',
            url: 'rtyu',
            likes: 9
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)


        const blogsAtEnd = await Blog.find({})

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })

    test('fails with 400 if content is not added', async () => {
        const newBlog = {
            author: 'wert'
        }

        await api
            .post('/api/blogs')
            .set({ Authorization: token })
            .send(newBlog)
            .expect(400)


        const blogsAtEnd = await Blog.find({})

        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })

    test('sets likes to zero if not defined', async () => {
        const newBlog = {
            title: 'wert',
            author: 'erty',
            url: 'rtyu',
        }

        await api
            .post('/api/blogs')
            .set({ Authorization: token })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await Blog.find({})
        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

        const addedBlog = await Blog.find({ title: 'wert', author: 'erty' }).exec()

        expect(addedBlog[0].likes).toBe(0)
    })
})

describe('deleting a blog', () => {
    test('succeeds with 204 if id is valid', async () => {
        const newBlog = {
            title: 'wert',
            author: 'erty',
            url: 'rtyu',
            likes: 9
        }

        await api
            .post('/api/blogs')
            .set({ Authorization: token })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogToDelete = await Blog.findOne({ title: 'wert' })

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({ Authorization: token })
            .expect(204)

        const blogsAtEnd = await Blog.find({})

        expect(blogsAtEnd).toHaveLength(
            initialBlogs.length
        )

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating a blog', () => {
    test('succeeds with 200 if id is valid', async () => {
        const blogsAtStart = await Blog.find({})
        const blogToUpdate = blogsAtStart[0]

        const newBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: 18
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set({ Authorization: token })
            .send(newBlog)
            .expect(200)

        const addedBlog = await Blog.find({
            title: blogToUpdate.title,
            author: blogToUpdate.author
        }).exec()

        expect(addedBlog[0].likes).toBe(18)
    })

})

afterAll(() => {
    mongoose.connection.close()
})