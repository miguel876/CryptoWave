import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Card } from './Card';

describe('Card component', () => {
  test('renders children correctly', () => {
    const { getByText } = render(
      <Card>
        <div>Test Child</div>
      </Card>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });
});