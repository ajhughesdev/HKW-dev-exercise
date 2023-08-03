import { describe, test, expect, it } from 'vitest'
import { fireEvent, getByText, render, screen } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  test('App mounts properly', () => {
    const wrapper = render(<App />)
    expect(wrapper).toBeTruthy()


    const h1 = wrapper.container.querySelector('h1')
    expect(h1?.textContent).toBe('Hi, Steve')

    const text = screen.getByText(
      /Next/i
    )
    expect(text.textContent).toBeTruthy()
  })

  it('Clicks next page', () => {
    const wrapper = render(<App />)
    const button = wrapper.container.querySelector('button.next') as HTMLButtonElement
    const pageNumber = wrapper.container.querySelector('div.page-number') as HTMLDivElement

    expect(button.textContent).toBe('Next')

    fireEvent(
      getByText(button, 'Next'),
      new MouseEvent('click', {
        bubbles: true
      })
    )

    expect(pageNumber.textContent).toBe('21 - 40 of 1000')
  })
})

