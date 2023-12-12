import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import FirstPage from './FirstPage';


jest.mock('../../features/contexts/UserContext', () => ({
  __esModule: true,
  default: {
    user: null,
  },
}));

describe('FirstPage Component', () => {
  it('renders loading component initially', async () => {
    render(<FirstPage />, { wrapper: MemoryRouter });

   
    expect(screen.getByTestId('loading-component')).toBeInTheDocument();

    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-component')).toBeNull();
    });
  });

  it('redirects to /feed if user is present', async () => {
   
    jest.mock('../../features/contexts/UserContext', () => ({
      __esModule: true,
      default: {
        user: { /* your user object here */ },
      },
    }));

    render(<FirstPage />, { wrapper: MemoryRouter });

    
    await waitFor(() => {
      
      expect(screen.queryByTestId('loading-component')).toBeNull();
      expect(window.location.pathname).toBe('/feed');
    });
  });

  it('renders correctly when user is not present', async () => {
    render(<FirstPage />, { wrapper: MemoryRouter });

    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-component')).toBeNull();
    });

    expect(screen.getByText('JOIN NOW')).toBeInTheDocument();
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();
  });

});
