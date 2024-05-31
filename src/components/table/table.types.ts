import { GridColDef } from '@mui/x-data-grid';

export type PropTypes = {
  rows?: [];
  columns: GridColDef[];
  loading?: boolean;
  [x: string]: unknown;
};
