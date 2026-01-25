import { render, screen } from '@testing-library/react'
import AesthetixWebsite from '../AesthetixWebsite'
import '@testing-library/jest-dom'

describe('AesthetixWebsite Component', () => {
  it('renders without crashing', () => {
    render(<AesthetixWebsite />)
    // Check for a static element that should always be present, like the header menu button.
    const menuButton = screen.getByText('MENU')
    expect(menuButton).toBeInTheDocument()
  })
})
