import {
  cleanup, render, screen
} from '@testing-library/react';
import App from './App';

describe('Given an instance of App', () => {
  afterEach(() => {
    cleanup();
  });

  it('When rendering the component', async () => {
      render(<App />);

    // Then the datagrid is rendered
    expect(await screen.findByText('Name')).toBeInTheDocument();
    expect(await screen.findByText('Content')).toBeInTheDocument();
  });

  it('When rendering the component a second time', async () => {
      const {rerender} = render(<App />);

      rerender(<App />);

    // Then the datagrid is rendered
    expect(await screen.findByRole('button', {name: 'Update file'})).toBeInTheDocument();
  });
}, {repeats: 10});