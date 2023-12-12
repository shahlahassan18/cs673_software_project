// FooterSearch.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterSearch from './FooterSearch';

test('renders FooterSearch component', () => {
  render(<FooterSearch />);

  const footerSearchElement = screen.getByTestId('footer-search');
  expect(footerSearchElement).toBeInTheDocument();


  const searchInputElement = screen.getByPlaceholderText('Search');
  expect(searchInputElement).toBeInTheDocument();
});

