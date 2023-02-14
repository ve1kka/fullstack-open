import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('can create blog with BlogForm', async () => {
  const createBlogMockHandler = jest.fn()
  const component = render(<BlogForm createBlog={createBlogMockHandler} />)

  const titleInput = component.container.querySelector('.titleInput')
  const authorInput = component.container.querySelector('.authorInput')
  const urlInput = component.container.querySelector('.urlInput')

  const user = userEvent.setup()
  await user.type(titleInput, 'blog')
  await user.type(authorInput, 'aaa')
  await user.type(urlInput, 'aaaa{enter}')

  expect(createBlogMockHandler.mock.calls).toHaveLength(1)
  expect(createBlogMockHandler.mock.calls[0][0].title).toBe('blog')
  expect(createBlogMockHandler.mock.calls[0][0].author).toBe('aaa')
  expect(createBlogMockHandler.mock.calls[0][0].url).toBe('aaaa')
})