const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        const { title, author, likes } = blogs.reduce((most, item) => most.likes > item.likes ? most : item)
        return { title, author, likes }
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const grouped = groupBy(blogs, blog => blog.author)
    let max = 0
    let authorName = null
    grouped.forEach((value, key) => {
        if (value.length > max) {
            max = value.length
            authorName = key
        }
    })
    return {
        author: authorName,
        blogs: max
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const grouped = groupBy(blogs, blog => blog.author)
    let sum = 0
    let max = 0
    let authorName = null
    grouped.forEach((value, key) => {
        sum = totalLikes(value)
        if (sum > max) {
            max = sum
            authorName = key
        }
    })
    return {
        author: authorName,
        likes: max
    }
}


function groupBy(list, keyGetter) {
    const map = new Map()
    list.forEach((item) => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection) {
            map.set(key, [item])
        } else {
            collection.push(item)
        }
    })
    return map
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}