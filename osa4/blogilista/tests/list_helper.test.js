const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithManyBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234e17f8',
            title: 'Go To Statement',
            author: 'Edsger Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson.html',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234f17f8',
            title: 'Go',
            author: 'Edsger W',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations.html',
            likes: 8,
            __v: 0
        }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        expect(result).toBe(13)
    })
})

describe('favorite blog', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithManyBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234e17f8',
            title: 'Go To Statement',
            author: 'Edsger Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson.html',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234f17f8',
            title: 'Go',
            author: 'Edsger W',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations.html',
            likes: 8,
            __v: 0
        }
    ]

    test('of empty list is null', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toBe(null)
    })

    test('of a one component list is calculated right', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.favoriteBlog(listWithManyBlogs)
        expect(result).toEqual({
            title: 'Go',
            author: 'Edsger W',
            likes: 8,
        })
    })
})

describe('most blogs', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithManyBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234e17f8',
            title: 'Go To Statement',
            author: 'Edsger Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson.html',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234f17f8',
            title: 'Go',
            author: 'Edsger W',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations.html',
            likes: 8,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Go To Statement Considered',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson.html',
            likes: 2,
            __v: 0
        },
    ]

    test('of empty list is null', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toBe(null)
    })

    test('of a one component list is calculated right', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1,
        })
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostBlogs(listWithManyBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 2,
        })
    })
})


describe('most likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithManyBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234e17f8',
            title: 'Go To Statement',
            author: 'Edsger Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson.html',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234f17f8',
            title: 'Go',
            author: 'Edsger W',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations.html',
            likes: 8,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Go To Statement Considered',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson.html',
            likes: 4,
            __v: 0
        },
    ]

    test('of empty list is null', () => {
        const result = listHelper.mostLikes([])
        expect(result).toBe(null)
    })

    test('of a one component list is calculated right', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostLikes(listWithManyBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 9,
        })
    })
})