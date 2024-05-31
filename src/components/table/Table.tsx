import { FC } from 'react'
import { PropTypes } from './table.types';
import { StyledDataGrid } from './table.styles';

export const Table:FC<PropTypes> = ({ rows, columns, loading, ...rest }) => {
  return (
    <StyledDataGrid
        rows={rows || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        loading={loading}
        pageSizeOptions={[10, 20, 50]}
        disableRowSelectionOnClick 
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableColumnResize
        disableVirtualization
        sx={{display: 'grid'}}
        {...rest}
      />
  )
}