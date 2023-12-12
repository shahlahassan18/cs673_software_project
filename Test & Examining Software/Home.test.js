import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

jest.mock('../Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../LeftProfile', () => () => <div data-testid="left-profile" />);
jest.mock('../Feed', () => () => <div data-testid="feed" />);
jest.mock('../Right', () => () => <div data-testid="right-news" />);
jest.mock('../FooterSearch', () => () => <div data-testid="footer-search" />);

describe('Home component', () => {
  it('renders Home component', () => {
    render(<Home />);

    
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('left-profile')).toBeInTheDocument();
    expect(screen.getByTestId('feed')).toBeInTheDocument();
    expect(screen.getByTestId('right-news')).toBeInTheDocument();
    expect(screen.getByTestId('footer-search')).toBeInTheDocument();
    
  });

  
});
