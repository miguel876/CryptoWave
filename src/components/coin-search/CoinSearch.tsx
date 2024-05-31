import { useState, useEffect } from 'react';
import { TextField, CircularProgress } from '@mui/material';
import useFetchAllCoins, { DataType } from 'hooks/useFetchAllCoins';
import { StyledAutoComplete, StyledLink } from './coin-search.styles';

export const CoinSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<DataType[] | undefined>([]);
  const { data, isLoading } = useFetchAllCoins({ isSimple: true });

  useEffect(() => {
    if (inputValue) {
      const filteredCoins = data?.filter(({ symbol, name }) =>
        name.toLowerCase().includes(inputValue.toLowerCase()) || 
        symbol.toLowerCase().includes(inputValue.toLowerCase())
      );
      setOptions(filteredCoins);
    } else {
      setOptions([]);
    }
  }, [data, inputValue]);

  return (
    <StyledAutoComplete
      freeSolo
      autoComplete
      autoHighlight
      options={options || []}
      getOptionLabel={(option) => (option as DataType).name}
      loading={isLoading}
      renderOption={(_, option) => {
        const coin = option as DataType;
        return (
          <StyledLink to={coin.id || ""} key={coin.id} >
            {coin.name}<span>({coin.symbol.toUpperCase()})</span>
          </StyledLink>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Coins"
          variant="standard"
          size="small"
          onChange={(e) => setInputValue(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};