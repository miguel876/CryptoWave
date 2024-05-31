import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { CoinChart } from './CoinChart';
import { timestampToDayMonth } from '../../utils/date.utils';
import useFetchCoinHistory from 'hooks/useFetchCoinHistory';

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

jest.mock('hooks/useFetchCoinHistory');
const mockedUseFetchCoinHistory = useFetchCoinHistory as jest.MockedFunction<typeof useFetchCoinHistory>;

jest.mock('../../utils/date.utils');
const mockedTimestampToDayMonth = timestampToDayMonth as jest.MockedFunction<typeof timestampToDayMonth>;

describe('CoinChart component', () => {
  beforeEach(() => {
    mockedUseFetchCoinHistory.mockClear();
    mockedTimestampToDayMonth.mockClear();
  });

  test('renders Loading component when data is loading', () => {
    mockedUseFetchCoinHistory.mockReturnValue({ data: null, isLoading: true, isError: null });

    render(<CoinChart id="bitcoin" />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});