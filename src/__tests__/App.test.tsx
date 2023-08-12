import { describe, test, expect, it } from 'vitest'
import { fireEvent, getByText, render, screen } from '@testing-library/react'
import App from '../App'

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

    expect(button?.textContent).toBe('Next')

    fireEvent(
      getByText(button, ''),
      new MouseEvent('click', {
        bubbles: true
      })
    )

    expect(pageNumber.textContent).toBe('21 - 40 of 100')
  })

  it('Search functionality works correctly', () => {
    const wrapper = render(<App />)
    const searchBar = wrapper.container.querySelector('input.search-bar') as HTMLInputElement
    fireEvent.change(searchBar, { target: { value: 'search query' } })
    expect(wrapper.container.querySelector('div.search-results')).toBeTruthy()
    expect(wrapper.container.querySelector('div.search-tags')).toContain('search query')
  })

  it('Column toggling functionality works correctly', () => {
    const wrapper = render(<App />)
    const columnToggle = wrapper.container.querySelector('button.column-toggle') as HTMLButtonElement
    fireEvent.click(columnToggle)
    expect(wrapper.container.querySelector('div.hidden-columns')).toContain('column name')
  })

  it('Sorting functionality works correctly', () => {
    const wrapper = render(<App />)
    const sortButton = wrapper.container.querySelector('button.sort-button') as HTMLButtonElement
    fireEvent.click(sortButton)
    expect(wrapper.container.querySelector('div.sort-state')).toContain('column name: ascending')
  })

  it('Row selection functionality works correctly', () => {
    const wrapper = render(<App />)
    const rowSelect = wrapper.container.querySelector('input.row-select') as HTMLInputElement
    fireEvent.click(rowSelect)
    expect(wrapper.container.querySelector('div.selected-rows')).toContain('row id')
  })

  it('Pagination functionality works correctly', () => {
    const wrapper = render(<App />)
    const nextPageButton = wrapper.container.querySelector('button.next') as HTMLButtonElement
    fireEvent.click(nextPageButton)
    expect(wrapper.container.querySelector('div.page-number')).toContain('21 - 40 of 100')
  })
})