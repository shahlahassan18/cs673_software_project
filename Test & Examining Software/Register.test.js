// Register.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Register from './Register';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));


jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: 'testUserId', email: 'test@example.com' } })),
  signInWithPopup: jest.fn(() => Promise.resolve({ user: { uid: 'testUserId', email: 'test@example.com' } })),
}));

jest.mock('../../firebase', () => ({
  db: {
   
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(() => Promise.resolve()),
      })),
    })),
  },
}));


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));


jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(() => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {} },
  })),
  set: jest.fn(),
}));

describe('Register Component', () => {
  it('renders the component correctly', () => {
    render(<Register />);
    
  });

  it('handles form submission correctly', async () => {
    render(<Register />);
    
    
    const formData = {
      email: 'test@example.com',
      password: 'TestPassword123!',
      confirmPassword: 'TestPassword123!',
      
    };

    
    userEvent.type(screen.getByLabelText(/email/i), formData.email);
    userEvent.type(screen.getByLabelText(/password/i), formData.password);
    userEvent.type(screen.getByLabelText(/confirm password/i), formData.confirmPassword);
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /register/i }));
    });

    
    await waitFor(() => {
      expect(screen.getByText(/registered successfully/i)).toBeInTheDocument();
    });
  });

  
});
