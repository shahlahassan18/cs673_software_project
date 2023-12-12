// UserProfile.test.js

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';
import UserProfile from './UserProfile';


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

describe('UserProfile Component', () => {
  it('renders the component correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/user/1']}>
          <Route path="/user/:userID">
            <UserProfile />
          </Route>
        </MemoryRouter>
      );
    });

    

  });


  
});
