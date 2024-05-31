import { FC, useMemo } from 'react'
import Card from 'components/card'
import { StyledTypography } from './favourites.styles'
import { useTranslation } from 'react-i18next'
import Table from 'components/table'
import { RowPropType } from 'pages/homepage/homepage.types'
import { StyledIcon, StyledLink, StyledNameContainer } from 'pages/homepage/homepage.styles'
import { Typography } from '@mui/material'
import useFetchAllCoins from 'hooks/useFetchAllCoins'
import { PropTypes } from './favourites.types'
import { renderCellPriceHandler } from 'utils/table.utils'

export const Favourites:FC<PropTypes> = ({ selectedCoins }) => {
    const { t } = useTranslation();
    const { data, isLoading } = useFetchAllCoins({params: `&ids=${selectedCoins}`});

    const tableCols = useMemo(() => [        
      { field: 'market_cap_rank', headerName: '#', width: 50 },
      { field: 'name', headerName: t('labels.name'), flex: 1, renderCell: ({ row: { id, image, name } }: RowPropType) => 
          <StyledLink to={id}>
            <StyledNameContainer>
              <StyledIcon src={image} />
              <Typography>{name}</Typography>
            </StyledNameContainer>
          </StyledLink>
          },
      { field: 'current_price', headerName: t('labels.price'), flex: 1, renderCell: renderCellPriceHandler},
      { field: 'price_change_percentage_24h', headerName: '24h %', flex: 1, renderCell: ({ row: { price_change_percentage_24h } }: RowPropType) => `${price_change_percentage_24h}%`},
  ], [t]);

  return (
    <Card>
      <StyledTypography>{t('labels.favourites')}</StyledTypography>
      <Table columns={tableCols} rows={data as []} hideFooter loading={isLoading} />

    </Card>
  )
}