// Users.test.js

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Users from './Users';


jest.mock('../../firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(() => Promise.resolve()),
      })),
      addDoc: jest.fn(() => Promise.resolve({ id: 'testDocId' })),
      getDoc: jest.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
      getDocs: jest.fn(() => ({
        docs: [
          { id: 'contactUserId', data: () => ({}) },
          { id: 'newConnectionUserId', data: () => ({}) },
          { id: 'requestUserId', data: () => ({}) },
        ],
      })),
      onSnapshot: jest.fn(() => {}),
    })),
  },
  getAuth: jest.fn(() => ({
    currentUser: {
      uid: 'testUserId',
    },
  })),
}));


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('Users Component', () => {
  it('renders the component correctly for new connections', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Users type="new-connections" />
        </MemoryRouter>
      );
    });

    

  });

  it('renders the component correctly for contacts', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Users type="contacts" />
        </MemoryRouter>
      );
    });

   

    
  });

  it('renders the component correctly for requests', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Users type="requests" />
        </MemoryRouter>
      );
    });

    

  });

  
});
