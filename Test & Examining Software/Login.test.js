// Login.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Login from './Login';
import { UserProvider } from '../../features/contexts/UserContext';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

jest.mock('../../firebase', () => ({
  db: {
    collection: jest.fn(),
    doc: jest.fn(),
  },
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));

describe('Login Component', () => {
  it('renders Login component', async () => {
    render(
      <Router>
        <UserProvider>
          <Login />
        </UserProvider>
      </Router>
    );

    const loginElement = screen.getByTestId('login');
    expect(loginElement).toBeInTheDocument();

   
    const emailInputElement = screen.getByLabelText(/email/i);
    expect(emailInputElement).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(
      <Router>
        <UserProvider>
          <Login />
        </UserProvider>
      </Router>
    );

    const mockSignInWithEmailAndPassword = jest.fn().mockResolvedValue({ user: { uid: '123' } });
    require('firebase/auth').signInWithEmailAndPassword.mockImplementation(mockSignInWithEmailAndPassword);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByText(/sign in/i));

    await waitFor(() => expect(mockSignInWithEmailAndPassword).toHaveBeenCalledTimes(1));


    expect(require('react-router-dom').useNavigate()).toHaveBeenCalledWith('/feed');
  });

  
});
