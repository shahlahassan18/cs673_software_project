import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Jobs from './Jobs';

jest.mock('../../firebase', () => ({
  db: {
    collection: jest.fn(),
  },
  storage: {
    ref: jest.fn(),
    uploadBytes: jest.fn(),
    getDownloadURL: jest.fn(),
  },
}));

jest.mock('react-places-autocomplete', () => ({
  PlacesAutocomplete: jest.fn(({ children }) => children),
  geocodeByAddress: jest.fn(),
  getLatLng: jest.fn(),
}));

describe('Jobs component', () => {
  it('renders Jobs component', () => {
    render(<Jobs />);

    
    expect(screen.getByText('Recommended Jobs')).toBeInTheDocument();
  });

  it('allows searching for jobs', async () => {
    render(<Jobs />);

   
    fireEvent.change(screen.getByPlaceholderText('Search Jobs'), { target: { value: 'developer' } });

    
    await waitFor(() => {
      expect(screen.getByText('Recommended Jobs')).toBeInTheDocument();
    });
  });

  it('opens and closes the "Post a Job" modal', async () => {
    render(<Jobs />);

    
    fireEvent.click(screen.getByText('Post a Job'));

    
    expect(screen.getByText('Post A Job')).toBeInTheDocument();

    
    fireEvent.click(screen.getByText('Close'));

    
    await waitFor(() => {
      expect(screen.queryByText('Post A Job')).not.toBeInTheDocument();
    });
  });

  
});
