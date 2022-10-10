import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'
import {useState} from 'react'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  const user = useQuery(CURRENT_USER)
  const [visible, setVisible] = useState('all genres')

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  let genres = []
  books.map(a => genres = genres.concat(a.genres))
  const set = new Set(genres)
  const setset = Array.from(set)
  let visible_books = books

  if (visible !== 'all genres') {
    visible_books = books.filter(b => b.genres.includes(visible))
  }

  if (props.recommend) {
    visible_books = books.filter(b => b.genres.includes(user.data.me.favouriteGenre))
    return (
      <div>
        <h2>recommendations</h2>
        <p>books in your favourite genre <b>{user.data.me.favouriteGenre}</b></p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {visible_books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{visible}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {visible_books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {setset.map(a => <button key={a} onClick={() => setVisible(a)}>{a}</button>)}
      <button onClick={() => setVisible('all genres')}>all genres</button>
    </div>
  )
}

export default Books
