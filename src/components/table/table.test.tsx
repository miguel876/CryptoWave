import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table } from './Table';
import tableData from './__fixtures__/tableData.json'

const mockColumns = [
  { field: 'market_cap_rank', headerName: '#', width: 50 },
  { field: 'name', headerName: 'name', flex: 1 },
  { field: 'current_price', headerName: 'price', flex: 1 },
  { field: 'price_change_percentage_24h', headerName: '24h %', flex: 1 },
  { field: 'market_cap', headerName: 'marketCap', flex: 1 },
  { field: 'total_volume', headerName: 'volume', flex: 1 },
  { field: 'circulating_supply', headerName: 'circulatingSupply', flex: 1 },
];

const mockTableData = tableData as [];

describe('Table component', () => {
  test('renders without crashing', () => {
    render(<Table rows={mockTableData} columns={mockColumns}/>);
  });

  test('renders rows and columns correctly', async () => {
    render(<Table rows={mockTableData} columns={mockColumns} />);

    waitFor(() => {
      const columnsElement = screen.getByRole('gridcell');
      const rowsElement = screen.getByRole('row');

      expect(columnsElement).toBeInTheDocument();
      expect(columnsElement.textContent).toBe(JSON.stringify(mockColumns));

      expect(rowsElement).toBeInTheDocument();
      expect(rowsElement.textContent).toBe(JSON.stringify(tableData));
    })  
  });

  test('renders default rows when no rows prop is provided', async () => {
    render(<Table columns={mockColumns} />);

    const rowsElement = screen.getByRole('row');

    waitFor(() => {
      expect(rowsElement.textContent).toBe(JSON.stringify([]));
    })    
  });
});