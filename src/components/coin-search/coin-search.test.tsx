import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { CoinSearch } from './CoinSearch';
import useFetchAllCoins from 'hooks/useFetchAllCoins';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('hooks/useFetchAllCoins');
const mockedUseFetchAllCoins = useFetchAllCoins as jest.MockedFunction<typeof useFetchAllCoins>;

const mockData = [
  {
    id: 'bitcoin',
    market_cap_rank: 1,
    name: 'Bitcoin',
    image: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
    current_price: 45000,
    price_change_percentage_24h: 5,
    market_cap: 850000000000,
    total_volume: 38000000000,
    circulating_supply: 18600000,
    last_updated: '2023-04-01T00:00:00Z',
    symbol: 'btc',
  },
  {
    id: 'ethereum',
    market_cap_rank: 2,
    name: 'Ethereum',
    image: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    current_price: 3000,
    price_change_percentage_24h: 3,
    market_cap: 350000000000,
    total_volume: 18000000000,
    circulating_supply: 115000000,
    last_updated: '2023-04-01T00:00:00Z',
    symbol: 'eth',
  },
];

describe('CoinSearch', () => {
  beforeEach(() => {
    mockedUseFetchAllCoins.mockClear();
  });

  test('renders without crashing and displays search input', () => {
    mockedUseFetchAllCoins.mockReturnValue({ data: mockData, isError: null, isLoading: false });

    render(
      <Router>
        <CoinSearch />
      </Router>
    );

    expect(screen.getByLabelText(/search coins/i)).toBeInTheDocument();
  });

  test('displays loading indicator when loading', () => {
    mockedUseFetchAllCoins.mockReturnValue({ data: null, isError: null, isLoading: true });

    render(
      <Router>
        <CoinSearch />
      </Router>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('filters and displays options based on input value', async () => {
    mockedUseFetchAllCoins.mockReturnValue({ data: mockData, isError: null, isLoading: false });

    render(
      <Router>
        <CoinSearch />
      </Router>
    );

    const input = screen.getByLabelText(/search coins/i);
    fireEvent.change(input, { target: { value: 'bit' } });

    await waitFor(() => {
      expect(screen.getByText(/Bitcoin/i)).toBeInTheDocument();
      expect(screen.queryByText(/Ethereum/i)).not.toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: 'eth' } });

    await waitFor(() => {
      expect(screen.getByText(/Ethereum/i)).toBeInTheDocument();
      expect(screen.queryByText(/Bitcoin/i)).not.toBeInTheDocument();
    });
  });
});