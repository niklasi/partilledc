import React from 'react'
import {customRender as render, waitFor, within, fireEvent} from '../../test-utils'
import App from '.' 

test('shows the children when the checkbox is checked', async () => {
  const { getByText, getByTestId } = render(<App params={{series: ''}} routes={[{name: ''}]} />)

  // const menuItem = getByTestId(/Division 1/i)
  // const button = within(menuItem).getByRole('button')

  // expect(button).toBeDefined()
  // fireEvent.click(button)

  expect(getByText('Lagserier')).toBeDefined()
  expect(getByText('Motionsserier')).toBeDefined()

})
