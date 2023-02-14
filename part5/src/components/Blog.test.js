import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Testing blog rendering', () => {
  const blog = {
    title: 'test title',
    author: 'tester',
    url: 'http://google.com',
    likes: 9999,
    user: {
      username: 'test account',
      name: 'test name',
    },
  }

  var component = null
  beforeEach(() => {
    component = render(<Blog blog={blog} blogUpdate={likeMockHandler}/>)
  })

  const likeMockHandler = jest.fn()

  test('rendering works', () => {
    expect(component.container).toHaveTextContent('test title')
    expect(component.container.user).toBeUndefined()
    expect(component.container.likes).toBeUndefined()
    const element = component.getByText('tester')
    expect(element).toBeDefined()

    const div = component.container.querySelector('.blog-container')
    expect(div).toHaveTextContent('test title by tester')
  })

  test('doesn\'t render likes and url by default', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)

    const contentHiddenByDefault = component.container.querySelector(
      '.togglableContent'
    )
    expect(contentHiddenByDefault).toHaveStyle('display: none')
    expect(contentHiddenByDefault).not.toBeVisible()
  })

  test('renders likes and url when button pressed', async () => {
    const button = component.container.querySelector('button')
    const user = userEvent.setup()
    await user.click(button)

    const contentHiddenByDefault = component.container.querySelector(
      '.togglableContent'
    )

    expect(contentHiddenByDefault).not.toHaveStyle('display: none')
    expect(contentHiddenByDefault).toBeVisible()
    expect(contentHiddenByDefault).toHaveTextContent(blog.likes)
    expect(contentHiddenByDefault).toHaveTextContent(blog.url)
  })

  test('if like pressed twice, the event handler is also called twice', async () => {
    const user = userEvent.setup()
    const viewButton = component.getByText('View')
    await user.click(viewButton)

    const likeButton = component.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})