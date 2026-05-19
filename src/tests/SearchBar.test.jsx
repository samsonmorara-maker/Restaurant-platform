
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchBar from '../Components/SearchBar'

const mockRestaurants = [
  { id: '1', name: 'Pizza Palace', cuisine: 'Italian' },
  { id: '2', name: 'Burger Barn', cuisine: 'Fast Food' },
  { id: '3', name: 'Sushi Spot', cuisine: 'Japanese' },
  { id: '4', name: 'Noodle House', cuisine: 'Chinese' },
]
let mockSetFilteredRestaurants
beforeEach(() => {
  mockSetFilteredRestaurants = vi.fn()
})
describe('SearchBar', () => {
  it('renders the search input', () => {
    render(<SearchBar restaurants={mockRestaurants} setFilteredRestaurants={mockSetFilteredRestaurants} />)
    expect(screen.getByPlaceholderText('Search restaurants...')).toBeInTheDocument()
  })
  it('renders all category buttons', () => {
    render(<SearchBar restaurants={mockRestaurants} setFilteredRestaurants={mockSetFilteredRestaurants} />)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Italian')).toBeInTheDocument()
    expect(screen.getByText('Japanese')).toBeInTheDocument()
    expect(screen.getByText('Fast Food')).toBeInTheDocument()
  })
  it('"All" category is active by default', () => {
    render(<SearchBar restaurants={mockRestaurants} setFilteredRestaurants={mockSetFilteredRestaurants} />)
    const allButton = screen.getByText('All')
    expect(allButton.className).toContain('bg-orange-500')
  })
  it('filters restaurants by search input', () => {
    render(<SearchBar restaurants={mockRestaurants} setFilteredRestaurants={mockSetFilteredRestaurants} />)
    fireEvent.change(screen.getByPlaceholderText('Search restaurants...'), {
      target: { value: 'pizza' },
    })
    expect(mockSetFilteredRestaurants).toHaveBeenCalledWith([
      { id: '1', name: 'Pizza Palace', cuisine: 'Italian' },
    ])
  })
  it('filters restaurants by category', () => {
    render(<SearchBar restaurants={mockRestaurants} setFilteredRestaurants={mockSetFilteredRestaurants} />)
    fireEvent.click(screen.getByText('Japanese'))
    expect(mockSetFilteredRestaurants).toHaveBeenCalledWith([
      { id: '3', name: 'Sushi Spot', cuisine: 'Japanese' },
    ])
  })
  it('active category button gets orange style', () => {
    render(<SearchBar restaurants={mockRestaurants} setFilteredRestaurants={mockSetFilteredRestaurants} />)
    fireEvent.click(screen.getByText('Italian'))
    expect(screen.getByText('Italian').className).toContain('bg-orange-500')
  })

  it('returns all restaurants when "All" category is selected', () => {
    render(<SearchBar restaurants={mockRestaurants} setFilteredRestaurants={mockSetFilteredRestaurants} />)
    fireEvent.click(screen.getByText('Fast Food'))
    fireEvent.click(screen.getByText('All'))
    expect(mockSetFilteredRestaurants).toHaveBeenLastCalledWith(mockRestaurants)
  })
  it('filters by both search and category together', () => {
    render(<SearchBar restaurants={mockRestaurants} setFilteredRestaurants={mockSetFilteredRestaurants} />)
    fireEvent.click(screen.getByText('Italian'))
    fireEvent.change(screen.getByPlaceholderText('Search restaurants...'), {
      target: { value: 'pizza' },
    })
    expect(mockSetFilteredRestaurants).toHaveBeenLastCalledWith([
      { id: '1', name: 'Pizza Palace', cuisine: 'Italian' },
    ])
  })
  it('returns empty array when no match found', () => {
    render(<SearchBar restaurants={mockRestaurants} setFilteredRestaurants={mockSetFilteredRestaurants} />)
    fireEvent.change(screen.getByPlaceholderText('Search restaurants...'), {
      target: { value: 'xyz123' },
    })
    expect(mockSetFilteredRestaurants).toHaveBeenCalledWith([])
  })
})