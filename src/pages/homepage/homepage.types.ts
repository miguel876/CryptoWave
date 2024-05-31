export type PropType = {
  id: number;
  title: string;
  detail: string;
  retired: boolean;
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

export type RowPropType = {
  row: DataType;
};
