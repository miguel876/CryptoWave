import { useState, useEffect } from 'react';
import { baseURL, apiKey, defaultCurrency } from 'config.json';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type ApiResponse = {
  data: DataType[] | null;
  isError: Error | null;
  isLoading: boolean;
};

export type DataType = {
  id: string;
  market_cap_rank: number;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  last_updated: string;
  symbol: string;
};

const useFetchAllCoins = ({
  params,
  refreshInterval = 60000,
  isSimple = false,
}: {
  params?: string;
  refreshInterval?: number;
  isSimple?: boolean;
} = {}): ApiResponse => {
  const { t } = useTranslation();
  const [data, setData] = useState<DataType[] | null>(null);
  const [isError, setIsError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(null);
    setData(null);

    const url = isSimple
      ? `${baseURL}/list`
      : `${baseURL}/markets?vs_currency=${defaultCurrency}${params || ''}`;

    try {
      const response = await fetch(url, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': apiKey,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setIsError(error as Error);
      toast.error(t('error.api'), {
        toastId: 'errorToastId',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [refreshInterval, params]);

  return { data, isError, isLoading };
};

export default useFetchAllCoins;
