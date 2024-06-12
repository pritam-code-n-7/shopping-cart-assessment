// Shopping.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Shopping from './Shopping';
import { BrowserRouter } from 'react-router-dom';
import { useFetchData } from '../customhooks/FetchData';

// Mock the custom hook
jest.mock('../customhooks/FetchData');

const mockProducts = [
  { id: 1, title: 'Product 1', price: 100, category: 'Category 1', rating: { rate: 4.5 } },
  { id: 2, title: 'Product 2', price: 200, category: 'Category 2', rating: { rate: 4.0 } },
];

const mockCategories = ['Category 1', 'Category 2'];

(useFetchData as jest.Mock).mockReturnValue({
  products: mockProducts,
  categories: mockCategories,
  loading: false,
});

test('renders the Shopping component', () => {
  render(
    <BrowserRouter>
      <Shopping />
    </BrowserRouter>
  );

  expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  expect(screen.getByLabelText('Filter by category')).toBeInTheDocument();
  expect(screen.getByLabelText('Minimum price')).toBeInTheDocument();
  expect(screen.getByLabelText('Maximum price')).toBeInTheDocument();
  expect(screen.getByLabelText('Minimum rating')).toBeInTheDocument();
  expect(screen.getByLabelText('Sort products')).toBeInTheDocument();
  expect(screen.getByText('Visit Cart:')).toBeInTheDocument();
});

test('filters products by category', () => {
  render(
    <BrowserRouter>
      <Shopping />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByLabelText('Filter by category'), {
    target: { value: 'Category 1' },
  });

  expect(screen.queryByText('Product 1')).toBeInTheDocument();
  expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
});

// Add more tests for other functionalities like sorting, pagination, etc.
