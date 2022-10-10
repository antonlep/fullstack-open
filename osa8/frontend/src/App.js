import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import jwt from 'jwt-decode'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [recommend, setRecommend] = useState(false)
  const client = useApolloClient()

  
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
