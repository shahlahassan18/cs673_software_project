import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LeftProfile from './LeftProfile';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
}));


jest.mock('../../firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      getDoc: jest.fn(() => Promise.resolve({ exists: true, data: jest.fn() })),
    })),
  },
  getAuth: jest.fn(() => ({ currentUser: { uid: 'mockedUserID' } })),
}));

describe('LeftProfile component', () => {
  it('renders LeftProfile component with user data', () => {
    render(<LeftProfile onFindJobsClick={() => {}} onSavedJobsClick={() => {}} handleTabClick={() => {}} />);

    
    expect(screen.getByText('Your component text')).toBeInTheDocument();
    
  });

  it('handles click on View Profile button', () => {
    render(<LeftProfile onFindJobsClick={() => {}} onSavedJobsClick={() => {}} handleTabClick={() => {}} />);

    fireEvent.click(screen.getByText('View Profile'));

    
    expect(screen.getByText('Expected text after clicking View Profile')).toBeInTheDocument();
    
  });

  
});
