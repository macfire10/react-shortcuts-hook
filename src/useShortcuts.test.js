import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useShortcuts } from './'

const TestComponent = ({ shortcut }) => {
  const [value, setValue] = useState(0)
  useShortcuts(shortcut, () => setValue(value + 1), [value])

  return <span>{value}</span>
}

const AdvancedTestComponent = ({ incrementShortcut, decrementShortcut }) => {
  const [value, setValue] = useState(0)
  useShortcuts(incrementShortcut, () => setValue(value + 1), [value])
  useShortcuts(decrementShortcut, () => setValue(value - 1), [value])

  return <span>{value}</span>
}

describe('useShortcut', () => {
  test('pressed key matches a single key shortcut', () => {
    const { container } = render(<TestComponent shortcut={['k']} />)
    fireEvent.keyDown(container, { key: 'k' })
    fireEvent.keyUp(container, { key: 'k' })

    expect(container.querySelector('span').textContent).toBe('1')
  })

  test('pressed key does not match a single key shortcut', () => {
    const { container } = render(<TestComponent shortcut={['k']} />)
    fireEvent.keyDown(container, { key: 'l' })

    expect(container.querySelector('span').textContent).toBe('0')
  })

  test('multiple pressed keys in correct order match the shortcut', () => {
    const { container } = render(<TestComponent shortcut={['control', 'k']} />)
    fireEvent.keyDown(container, { key: 'control' })
    fireEvent.keyDown(container, { key: 'k' })
    fireEvent.keyUp(container, { key: 'control' })
    fireEvent.keyUp(container, { key: 'k' })

    expect(container.querySelector('span').textContent).toBe('1')
  })

  test('multiple pressed keys in incorrect order match the shortcut', () => {
    const { container } = render(<TestComponent shortcut={['control', 'k']} />)
    fireEvent.keyDown(container, { key: 'control' })
    fireEvent.keyUp(container, { key: 'control' })
    fireEvent.keyDown(container, { key: 'k' })
    fireEvent.keyUp(container, { key: 'k' })

    expect(container.querySelector('span').textContent).toBe('0')
  })

  test('multiple pressed keys in correct order do not match the shortcut', () => {
    const { container } = render(<TestComponent shortcut={['control', 'k']} />)
    fireEvent.keyDown(container, { key: 'control' })
    fireEvent.keyDown(container, { key: 'l' })
    fireEvent.keyUp(container, { key: 'control' })
    fireEvent.keyUp(container, { key: 'l' })

    expect(container.querySelector('span').textContent).toBe('0')
  })

  test('three-keys shortcut called', () => {
    const shortcut = ['control', 'alt', 'k']
    const { container } = render(<TestComponent shortcut={shortcut} />)

    shortcut.map(key => {
      fireEvent.keyDown(container, { key })
    })

    shortcut.map(key => {
      fireEvent.keyUp(container, { key })
    })

    expect(container.querySelector('span').textContent).toBe('1')
  })

  test('call the hook multiple times', () => {
    const incrementShortcut = ['k']
    const decrementShortcut = ['l']
    const { container } = render(<AdvancedTestComponent
      incrementShortcut={incrementShortcut}
      decrementShortcut={decrementShortcut}
    />)

    fireEvent.keyDown(container, { key: incrementShortcut })
    fireEvent.keyUp(container, { key: incrementShortcut })

    fireEvent.keyDown(container, { key: incrementShortcut })
    fireEvent.keyUp(container, { key: incrementShortcut })

    fireEvent.keyDown(container, { key: decrementShortcut })
    fireEvent.keyUp(container, { key: decrementShortcut })

    expect(container.querySelector('span').textContent).toBe('1')
  })

  test('shortcuts should be case-insensitive', () => {
    const { container } = render(<TestComponent shortcut={['cOnTroL', 'L']} />)
    fireEvent.keyDown(container, { key: 'ContROL' })
    fireEvent.keyDown(container, { key: 'L' })
    fireEvent.keyUp(container, { key: 'ContROL' })
    fireEvent.keyUp(container, { key: 'L' })

    expect(container.querySelector('span').textContent).toBe('1')
  })

  test('shortcuts should be order-insensitive', () => {
    const { container } = render(<TestComponent shortcut={['cOnTroL', 'L']} />)
    fireEvent.keyDown(container, { key: 'L' })
    fireEvent.keyDown(container, { key: 'ContROL' })
    fireEvent.keyUp(container, { key: 'ContROL' })
    fireEvent.keyUp(container, { key: 'L' })

    expect(container.querySelector('span').textContent).toBe('1')
  })
})
