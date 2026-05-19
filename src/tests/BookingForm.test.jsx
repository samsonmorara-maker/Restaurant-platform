
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import BookingForm from '../Components/BookingForm'

global.fetch = vi.fn()
const mockRestaurant = {
  id: '1',
  name: 'Test Restaurant',
}
const mockPreOrderItems = [
  { name: 'Burger', price: 10.99, image: 'burger.jpg' },
  { name: 'Pizza', price: 12.99, image: 'pizza.jpg' },
]
beforeEach(() => {
  vi.clearAllMocks()
})
describe('BookingForm', () => {
  it('renders the form with restaurant name', () => {
    render(<BookingForm restaurant={mockRestaurant} preOrderItems={[]} />)
    expect(screen.getByText('Book Test Restaurant')).toBeInTheDocument()
  })
  it('renders all input fields', () => {
    render(<BookingForm restaurant={mockRestaurant} preOrderItems={[]} />)
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('number of guests')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Table Number')).toBeInTheDocument()
  })
  it('renders pre-order items when provided', () => {
    render(<BookingForm restaurant={mockRestaurant} preOrderItems={mockPreOrderItems} />)
    expect(screen.getByText('Burger')).toBeInTheDocument()
    expect(screen.getByText('Pizza')).toBeInTheDocument()
    expect(screen.getByText('$10.99')).toBeInTheDocument()
  })
  it('does not render pre-order section when empty', () => {
    render(<BookingForm restaurant={mockRestaurant} preOrderItems={[]} />)
    expect(screen.queryByText('pre-ordered meal')).not.toBeInTheDocument()
  })
  it('updates input fields when typed into', () => {
    render(<BookingForm restaurant={mockRestaurant} preOrderItems={[]} />)
    const nameInput = screen.getByPlaceholderText('Your Name')
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    expect(nameInput.value).toBe('John Doe')
  })
  it('shows "Booking..." while submitting', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true })
    render(<BookingForm restaurant={mockRestaurant} preOrderItems={[]} />)
    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'John' } })
    fireEvent.change(screen.getByDisplayValue(''), { target: { value: '2025-12-01' } })
    fireEvent.click(screen.getByText('Confirm Booking'))
    expect(await screen.findByText('Booking...')).toBeInTheDocument()
  })
  it('submits the form with correct data', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true })
    window.alert = vi.fn()
    render(<BookingForm restaurant={mockRestaurant} preOrderItems={mockPreOrderItems} />)
    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'John' } })
    fireEvent.change(screen.getByPlaceholderText('number of guests'), { target: { value: '3' } })
    fireEvent.click(screen.getByText('Confirm Booking'))
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://restaurant-platform-cr7r.onrender.com/bookings',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      )
    })
  })

  it('shows alert on successful booking', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true })
    window.alert = vi.fn()

    render(<BookingForm restaurant={mockRestaurant} preOrderItems={[]} />)
    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'John' } })
    fireEvent.click(screen.getByText('Confirm Booking'))

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Booking successful!')
    })
  })
  it('handles failed booking gracefully', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false })
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(<BookingForm restaurant={mockRestaurant} preOrderItems={[]} />)
    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'John' } })
    fireEvent.click(screen.getByText('Confirm Booking'))
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled()
    })
  })
})