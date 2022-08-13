const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
    {
        username: 'asfd',
        name: 'aaaa',
        passwordhash: '12341234'
    },
    {
        username: 'qwer',
        name: 'qqqq',
        passwordhash: '23452345'
    },

]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})

describe('when there are initial users', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all users are returned', async () => {
        const response = await api.get('/api/users')

        expect(response.body).toHaveLength(initialUsers.length)
    })

    test('a specific user is within the returned users', async () => {
        const response = await api.get('/api/users')

        const username = response.body.map(r => r.username)
        const name = response.body.map(r => r.name)

        expect(username).toContain('asfd')
        expect(name).toContain('aaaa')
    })

    test('id field is correct', async () => {
        const response = await api.get('/api/users')

        expect(response.body[0].id).toBeDefined()
    })

})

describe('addition of a new user', () => {

    test('succeeds if user is correct ', async () => {
        const newUser = {
            username: 'wert',
            name: 'erty',
            password: 'rtyu'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(initialUsers.length + 1)

        const addedUser = await User.findOne({ username: 'wert' })

        expect(addedUser.name).toBe(newUser.name)
        expect(addedUser.username).toBe(newUser.username)
    })

    test('fails with 400 if username is not added', async () => {
        const newUser = {
            name: 'erty',
            password: 'rtyu'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const blogsAtEnd = await User.find({})

        expect(blogsAtEnd).toHaveLength(initialUsers.length)
    })

    test('fails with 400 if password is not added', async () => {
        const newUser = {
            username: 'wert',
            name: 'erty'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const blogsAtEnd = await User.find({})

        expect(blogsAtEnd).toHaveLength(initialUsers.length)
    })

    test('fails with 400 if username is too short', async () => {
        const newUser = {
            username: 'w',
            name: 'erty',
            password: 'rtyu'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const blogsAtEnd = await User.find({})

        expect(blogsAtEnd).toHaveLength(initialUsers.length)
    })

    test('fails with 400 if password is too short', async () => {
        const newUser = {
            username: 'wert',
            name: 'erty',
            password: 'r'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const blogsAtEnd = await User.find({})

        expect(blogsAtEnd).toHaveLength(initialUsers.length)
    })

    test('fails with 400 if username is not unique', async () => {
        const newUser = {
            username: 'asfd',
            name: 'erty',
            password: '12341234'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const blogsAtEnd = await User.find({})

        expect(blogsAtEnd).toHaveLength(initialUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})