import { RowPropType } from 'pages/homepage/homepage.types';
import { defaultCurrencyIcon } from 'config.json';

export const renderCellPriceHandler = ({
  row: { current_price },
}: RowPropType) => `${defaultCurrencyIcon}${current_price}`;
