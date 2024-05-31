import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FavouriteButton } from './FavouriteButton';
import { toast } from 'react-toastify';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('FavouriteButton', () => {
  const setup = (selectedCoins: string[] = []) => {
    const setSelectedCoins = jest.fn();
    render(
      <FavouriteButton id="bitcoin" selectedCoins={selectedCoins} setSelectedCoins={setSelectedCoins} />
    );
    return { setSelectedCoins };
  };

  test('renders without crashing', () => {
    setup();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('toggles the favorite state', () => {
    const { setSelectedCoins } = setup(['bitcoin']);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(setSelectedCoins).toHaveBeenCalledWith(expect.any(Function));

    const setSelectedCoinsCallback = setSelectedCoins.mock.calls[0][0];

    const newState = setSelectedCoinsCallback(['bitcoin']);
    expect(newState).toEqual([]);

    fireEvent.click(button);
    expect(setSelectedCoins).toHaveBeenCalledWith(expect.any(Function));

    const setSelectedCoinsCallbackAdd = setSelectedCoins.mock.calls[1][0];

    const newStateAdd = setSelectedCoinsCallbackAdd([]);
    expect(newStateAdd).toEqual(['bitcoin']);
  });

  test('does not exceed the maximum limit of 5 favorites', async () => {
    const initialSelectedCoins = ['coin1', 'coin2', 'coin3', 'coin4', 'coin5'];
    const { setSelectedCoins } = setup(initialSelectedCoins);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    waitFor(() => expect(toast.error).toHaveBeenCalled());
    expect(setSelectedCoins).not.toHaveBeenCalledWith(expect.arrayContaining(['bitcoin']));
  });

  test('displays success message on adding to favorites', () => {
    const { setSelectedCoins } = setup(['coin1', 'coin2']);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(toast.success).toHaveBeenCalledWith('messages.favouritesListSuccess');
    expect(setSelectedCoins).toHaveBeenCalledWith(expect.any(Function));

    const setSelectedCoinsCallback = setSelectedCoins.mock.calls[0][0];
    const newState = setSelectedCoinsCallback(['coin1', 'coin2']);
    expect(newState).toEqual(['coin1', 'coin2', 'bitcoin']);
  });

  test('saves to localStorage on update', async () => {
    setup(['coin1', 'coin2']);
    jest.spyOn(Storage.prototype, 'setItem');
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    waitFor(() => expect(localStorage.setItem).toHaveBeenCalledWith('favouriteCoins', JSON.stringify(['coin1', 'coin2', 'bitcoin'])));
  });
});
