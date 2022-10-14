import { useState } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [recommend, setRecommend] = useState(false)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert("Book added:" + addedBook.title)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const setRecommendAndPage = (rec) => {
    setRecommend(rec)
    setPage('books')
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Authors logged = "False" show={page === 'authors'} />
        <Books show={page === 'books'} />
        <Login setToken={setToken} page={page} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setRecommendAndPage(false)}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setRecommendAndPage(true)}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>
      <Authors logged = "True" show={page === 'authors'} />
      <Books show={page === 'books'} recommend={recommend} />
      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
