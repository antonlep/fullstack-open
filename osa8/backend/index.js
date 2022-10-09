const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'SECRET_KEY'

const MONGODB_URI =
  'mongodb+srv://fullstack:fullstack@cluster0.2xqgmmj.mongodb.net/libraryApp?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

// /*
//  * Suomi:
//  * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
//  * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
//  *
//  * English:
//  * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
//  * However, for simplicity, we will store the author's name in connection with the book
//  *
//  * Spanish:
//  * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
//  * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
// */

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const typeDefs = gql`
    type User {
      username: String!
      favouriteGenre: String!
      id: ID!
    }

    type Token {
      value: String!
    }

    type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book
        addAuthor(
            name: String!
        ): Author
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
          username: String!
          favouriteGenre: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
      }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        if (args.author && args.genre) {
            return Book.find({ author: args.author, genres: args.genre })
        } else if (args.author) {
            const b = await Book.find({author: args.author})
            console.log(b)
            return Book.find({ author: args.author })
        } else if (args.genre) {
            return Book.find({ genres: args.genre })
        }
        return Book.find({})
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    } 
  },
    Author: {
        bookCount: async (root) => {
          return Book.find({ author: root.id}).countDocuments()
        }
    },
    Book: {
      author: async (root) => {
        const auth = await Author.findOne({ _id: root.author})
        return {
          name: auth.name,
          id: auth.id,
          born: auth.born,
          bookCount: auth.bookCount
        }
      }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const old = await Author.find({ name: args.author })
            const currentUser = context.currentUser
            if (!currentUser) {
              throw new AuthenticationError('not authenticated')
            }      
            if (old.length === 0) {
                const author = new Author ({name: args.author})
                try {
                  await author.save()
                } catch (error) {
                  throw new UserInputError(error.message, {
                    invalidArgs: args,
                  })
                }
            }
            const authorId = await Author.findOne({ name: args.author })
            const book = new Book ({ ...args, author: authorId.id })
            try {
              await book.save()
            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            }
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
              throw new AuthenticationError('not authenticated')
            }      
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo
            try {
              await author.save()
            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            }
            return author
        },
        createUser: async (root, args) => {
          const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
      
          return user.save()
            .catch(error => {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            })
        },
        login: async (root, args) => {
          const user = await User.findOne({ username: args.username })
      
          if ( !user || args.password !== 'password' ) {
            throw new UserInputError("wrong credentials")
          }
      
          const userForToken = {
            username: user.username,
            id: user._id,
          }
      
          return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})