import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Loading } from './Loading';

describe('Loading component', () => {
  test('renders with default size', () => {
    const { getByRole } = render(<Loading />);
    const circularProgress = getByRole('progressbar');

    expect(circularProgress).toBeInTheDocument();
    expect(circularProgress).toHaveStyle({ width: '40px', height: '40px' });
  });

  test('renders with custom size', () => {
    const { getByRole } = render(<Loading size={60} />);
    const circularProgress = getByRole('progressbar');

    expect(circularProgress).toBeInTheDocument();
    expect(circularProgress).toHaveStyle({ width: '60px', height: '60px' });
  });
});