import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div className='formDiv'>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <p>
          Title:{' '}
          <input
            id='titleInput'
            value={newBlogTitle}
            onChange={handleTitleChange}
            className='titleInput'
          />
        </p>
        <p>
          Author:{' '}
          <input
            id='authorInput'
            value={newBlogAuthor}
            onChange={handleAuthorChange}
            className='authorInput'
          />
        </p>
        <p>
          Url:{' '}
          <input
            id='urlInput'
            value={newBlogUrl}
            onChange={handleUrlChange}
            className='urlInput'
          />
        </p>
        <button id='newBlogButton' type='submit'>
          Add
        </button>
      </form>
    </div>
  )
}

export default BlogForm