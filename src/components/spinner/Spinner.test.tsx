import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Spinner } from '..'

describe('Spinner component', () => {
  it('should render', () => {
    const { container } = render(<Spinner />)
    expect(container.querySelector('.spinner')).toBeDefined()
  })
})
