import { describe, it } from 'vitest'
import { Spinner } from '..'
import { render } from '@testing-library/react'

describe('Spinner component', () => {
  it('should render', () => {
    const { container } = render(<Spinner />)
    expect(container.querySelector('.spinner')).toBeDefined()
  })
})
