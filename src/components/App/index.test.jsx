/* global test, expect */
import React from 'react'
import { customRender as render, within, fireEvent } from '../../test-utils'
import App from '.'

test('menu test', async () => {
  const { getByText, getByTestId, findByText, debug } = render(<App params={{ series: '' }} routes={[{ name: '' }]} />)

  const menuItem = getByTestId(/Division 1/i)
  const button = within(menuItem).getByRole('button')

  expect(button).toBeDefined()
  fireEvent.click(button)

  debug(menuItem)

  expect(getByText('Lagserier')).toBeDefined()
  expect(getByText('Motionsserier')).toBeDefined()
})
