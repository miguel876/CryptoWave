import { useNavigate, useParams } from 'react-router-dom'
import { StyledBackBtn, StyledBottomPanel, StyledContainer, StyledImg, StyledTopPanel, Subtitle, Title } from './coin.styles'
import Loading from 'components/loading'
import { Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next'
import useFetchAllCoins, { DataType } from 'hooks/useFetchAllCoins'
import CoinChart from 'components/coin-chart';

export const CoinDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams()
    const { data } = useFetchAllCoins({ params: `&ids=${id}`})
    const navigate = useNavigate();

    const coinDetailData = data ? data[0] : {} as DataType;

  return (
    <StyledContainer>
        {
            data ?
            <>
                <StyledTopPanel>
                    <div>
                        <StyledBackBtn onClick={() => navigate('/')}>
                            <ArrowBackIcon />
                        </StyledBackBtn>
                        <StyledImg src={coinDetailData.image} alt="Coin Image" />
                        <Title>{coinDetailData.name}</Title>
                    </div>
                    <CoinChart id={coinDetailData.id} />
                    
                </StyledTopPanel>
                <StyledBottomPanel>
                    <Subtitle>{t('labels.price')}</Subtitle>
                    <Typography>{coinDetailData.current_price}</Typography>
                    <Subtitle>24h %</Subtitle>
                    <Typography>{coinDetailData.price_change_percentage_24h}</Typography>
                    <Subtitle>{t('labels.marketCap')}</Subtitle>
                    <Typography>{coinDetailData.market_cap}</Typography>
                    <Subtitle>{t('labels.volume')}</Subtitle>
                    <Typography>{coinDetailData.total_volume}</Typography>
                    <Subtitle>{t('labels.circulatingSupply')}</Subtitle>
                    <Typography>{coinDetailData.circulating_supply}</Typography>
                </StyledBottomPanel>
            </>
            :
            <Loading />
        }
    </StyledContainer>
  )
}