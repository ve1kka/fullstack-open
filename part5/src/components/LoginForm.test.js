import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Togglable from './Togglable'
import userEvent from '@testing-library/user-event'


describe('Togglable', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel='View' cancelButtonLabel='Hide'>
        <div className='testDiv' />
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined()
  })

  test('children are initially not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('children are displayed after clicking the button', async () => {
    const button = component.getByText('View')
    const user = userEvent.setup()
    await user.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('once toggled content can be toggled off', async () => {
    const button = component.container.querySelector('button')
    const user = userEvent.setup()
    await user.click(button)
  
    const closeButton = component.container.querySelector(
      'button:nth-child(2)'
    )
    await user.click(closeButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})