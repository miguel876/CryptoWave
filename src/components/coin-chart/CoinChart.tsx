import { FC } from 'react'
import { PropTypes } from './coin-chart.types'
import useFetchCoinHistory from 'hooks/useFetchCoinHistory';
import Loading from 'components/loading';
import { timestampToDayMonth } from '../../utils/date.utils';
import { StyledLineChart } from './coin-chart.styles';

export const CoinChart:FC<PropTypes> = ({ id }) => {
  const { data, isLoading } = useFetchCoinHistory(id);

  const chartLabels = data?.prices.reverse().map((val) => timestampToDayMonth(val[0]))
  const chartData = {
    labels: chartLabels,
    datasets: [{data: data?.prices.reverse().map((val) => val[1])}]
}

  return (
    <>
      {
        !isLoading ? 
        <StyledLineChart data={chartData} />
          :
          <Loading />
      }
    </>
  )
}