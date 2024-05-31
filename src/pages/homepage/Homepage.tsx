import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table from 'components/table';
import useFetchAllCoins from 'hooks/useFetchAllCoins';
import Favourites from './components/favourites';
import { StyledContainer, StyledFavouritesContainer, StyledFavouritesWrapper, StyledIcon, StyledLink, StyledNameContainer, StyledTypography } from './homepage.styles';
import { Typography } from '@mui/material';
import { RowPropType } from './homepage.types';
import FavouriteButton from 'components/favourite-button';
import Card from 'components/card';
import { renderCellPriceHandler } from 'utils/table.utils';

export const Homepage = () => {
  const { t } = useTranslation();
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);
  const { data, isLoading } = useFetchAllCoins();

  const tableCols = useMemo(() => [
      { field: "checked", headerName: "", renderCell: ({ row: { id }}: RowPropType) => 
          <FavouriteButton id={id} selectedCoins={selectedCoins} setSelectedCoins={setSelectedCoins} />},        
      { field: 'market_cap_rank', headerName: '#', width: 50 },
      { field: 'name', headerName: t('labels.name'), flex: 1, renderCell: ({ row: { id, image, name } }: RowPropType) => 
        <StyledLink to={id}>
          <StyledNameContainer>
            <StyledIcon src={image} />
            <Typography>{name}</Typography>
          </StyledNameContainer>
        </StyledLink>},
      { field: 'current_price', headerName: t('labels.price'), flex: 1, renderCell: renderCellPriceHandler},
      { field: 'price_change_percentage_24h', headerName: '24h %', flex: 1, renderCell: ({ row: { price_change_percentage_24h } }: RowPropType) => `${price_change_percentage_24h}%`},
      { field: 'market_cap', headerName: t('labels.marketCap'), flex: 1, renderCell: renderCellPriceHandler},
      { field: 'total_volume', headerName: t('labels.volume'), flex: 1, renderCell: renderCellPriceHandler},
      { field: 'circulating_supply', headerName: t('labels.circulatingSupply'), flex: 1, renderCell: ({ row: { symbol, circulating_supply } }: RowPropType) => `${symbol.toUpperCase()} ${circulating_supply}`},
  ], [t, selectedCoins, setSelectedCoins]);

  useEffect(() => {
      const savedSelectedCoins = localStorage.getItem('favouriteCoins');
      if (savedSelectedCoins) {
          setSelectedCoins(JSON.parse(savedSelectedCoins));
      }
  }, []);

  return (
      <StyledContainer>
        <StyledFavouritesWrapper>
          <StyledFavouritesContainer>
            {selectedCoins.length > 0 && <Favourites selectedCoins={selectedCoins}  />}
          </StyledFavouritesContainer>
          <StyledFavouritesContainer>
            <Card><StyledTypography>{t('labels.comingSoon')}</StyledTypography></Card>
          </StyledFavouritesContainer>
        </StyledFavouritesWrapper>
        <Table columns={tableCols} rows={data as []} loading={isLoading}/>
      </StyledContainer>
  );
};
