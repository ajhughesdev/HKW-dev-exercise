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

  it('Searches for a term', () => {
    const wrapper = render(<App />)
    const searchBar = wrapper.container.querySelector('input.search-bar') as HTMLInputElement

    fireEvent.change(searchBar, { target: { value: 'test' } })

    expect(wrapper.container.querySelector('div.filtered-data').textContent).toContain('test')
  })

  it('Toggles a column', () => {
    const wrapper = render(<App />)
    const columnToggler = wrapper.container.querySelector('button.column-toggler') as HTMLButtonElement

    fireEvent.click(columnToggler)

    expect(wrapper.container.querySelector('div.hidden-columns').textContent).toContain('column-name')
  })

  it('Sorts a column', () => {
    const wrapper = render(<App />)
    const columnHeader = wrapper.container.querySelector('th.column-header') as HTMLTableHeaderCellElement

    fireEvent.click(columnHeader)

    expect(wrapper.container.querySelector('div.sort-state').textContent).toBe('column-name ascending')
  })

  it('Selects a row', () => {
    const wrapper = render(<App />)
    const rowCheckbox = wrapper.container.querySelector('input.row-checkbox') as HTMLInputElement

    fireEvent.click(rowCheckbox)

    expect(wrapper.container.querySelector('div.selected-rows').textContent).toContain('row-id')
  })
})
