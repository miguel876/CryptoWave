import { useState, useEffect } from 'react';
import { baseURL, apiKey, defaultCurrency } from 'config.json';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type ApiResponse = {
  data: { prices: number[][] } | null;
  isError: Error | null;
  isLoading: boolean;
};

const useFetchCoinHistory = (coinId: string): ApiResponse => {
  const { t } = useTranslation();
  const [data, setData] = useState<{ prices: [] } | null>(null);
  const [isError, setIsError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(null);
    setData(null);

    try {
      const response = await fetch(
        `${baseURL}/${coinId}/market_chart?vs_currency=${defaultCurrency}&days=30&interval=daily`,
        {
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': apiKey,
          },
        }
      );
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
  }, []);

  return { data, isError, isLoading };
};

export default useFetchCoinHistory;
