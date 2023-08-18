import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AddModal } from '..'

describe('AddModal component', () => {
  it('should render the close button', () => {
    const { container } = render(<AddModal onCancel={vi.fn()} onConfirm={vi.fn()} />)
    expect(container.querySelector('.add-modal__close')).toBeInTheDocument()
  })
  it('should render the form', () => {
    const { container } = render(<AddModal onCancel={vi.fn()} onConfirm={vi.fn()} />)
    expect(container.querySelector('form')).toBeInTheDocument()
  })
  it('should render the content textarea', () => {
    const { container } = render(<AddModal onCancel={vi.fn()} onConfirm={vi.fn()} />)
    expect(container.querySelector('#add-form-content')).toBeInTheDocument()
  })
  it('should render the author input', () => {
    const { container } = render(<AddModal onCancel={vi.fn()} onConfirm={vi.fn()} />)
    expect(container.querySelector('#add-form-author')).toBeInTheDocument()
  })
  it('should render the cancel button', () => {
    const { container } = render(<AddModal onCancel={vi.fn()} onConfirm={vi.fn()} />)
    expect(container.querySelector('.add-modal__cancel')).toHaveTextContent('Cancel')
  })
  it('should render the add button', () => {
    const { container } = render(<AddModal onCancel={vi.fn()} onConfirm={vi.fn()} />)
    expect(container.querySelector('.add-modal__add')).toHaveTextContent('Add')
  })
  it('should call onCancel when the close button is clicked', () => {
    const onCancel = vi.fn()
    const { container } = render(<AddModal onCancel={onCancel} onConfirm={vi.fn()} />)
    const closeButton = container.querySelector('.add-modal__close')!
    fireEvent.click(closeButton)
    expect(onCancel).toHaveBeenCalledOnce()
  })
  it('should call onCancel when the cancel button is clicked', () => {
    const onCancel = vi.fn()
    const { container } = render(<AddModal onCancel={onCancel} onConfirm={vi.fn()} />)
    const cancelButton = container.querySelector('.add-modal__cancel')!
    fireEvent.click(cancelButton)
    expect(onCancel).toHaveBeenCalledOnce()
  })
  it('should not call onConfirm when the add button is clicked if content textarea is empty', () => {
    const onConfirm = vi.fn()
    const { container } = render(<AddModal onCancel={vi.fn()} onConfirm={onConfirm} />)
    const addButton = container.querySelector('.add-modal__add')!
    const contentTextarea = container.querySelector('#add-form-content')!
    expect(contentTextarea).toHaveTextContent('')
    fireEvent.click(addButton)
    expect(onConfirm).not.toHaveBeenCalled()
  })
  it('should call onConfirm with input content and author null when the add button is clicked', () => {
    const onConfirm = vi.fn()
    const { container } = render(<AddModal onCancel={vi.fn()} onConfirm={onConfirm} />)
    const contentTextarea = container.querySelector('#add-form-content')!
    fireEvent.change(contentTextarea, { target: { value: '__CONTENT__' } })
    const addButton = container.querySelector('.add-modal__add')!
    fireEvent.click(addButton)
    expect(onConfirm).toHaveBeenCalledWith({ content: '__CONTENT__', author: null })
  })
  it('should call onConfirm with input author and content when the add button is clicked', () => {
    const onConfirm = vi.fn()
    const { container } = render(<AddModal onCancel={vi.fn()} onConfirm={onConfirm} />)
    const contentTextarea = container.querySelector('#add-form-content')!
    fireEvent.change(contentTextarea, { target: { value: '__CONTENT__' } })
    const authorInput = container.querySelector('#add-form-author')!
    fireEvent.change(authorInput, { target: { value: '__AUTHOR__' } })
    const addButton = container.querySelector('.add-modal__add')!
    fireEvent.click(addButton)
    expect(onConfirm).toHaveBeenCalledWith({ content: '__CONTENT__', author: '__AUTHOR__' })
  })
})
