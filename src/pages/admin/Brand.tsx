/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// Demo component

import { Typography, Box, Toolbar, Paper } from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { format } from 'date-fns';
import { Brand as BrandType } from 'modals/Brand';
import { resetBrands } from 'app/store/features/brand/brandSlice';
import { getBrandsThunk } from 'app/store/features/brand/brandThunk';

const Brand: FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useAppDispatch();
  const brands = useAppSelector((state) => state.brand.brands.data);

  interface Column {
    id: 'id' | 'name' | 'description' | 'created_at' | 'updated_at';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'description', label: 'Description' },
    { id: 'created_at', label: 'Created At' },
    { id: 'updated_at', label: 'Updated At' },
  ];

  interface Data {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  }

  function createDataRow(list: BrandType[]): Data[] {
    const data: Data[] = [];
    list.forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id, name, description, created_at, updated_at } = item;
      data.push({
        id,
        name,
        description,
        created_at: format(new Date(created_at), 'dd-MM-yyyy HH:mm'),
        updated_at: format(new Date(updated_at), 'dd-MM-yyyy HH:mm'),
      });
    });
    return data;
  }

  const rows = brands ? createDataRow(brands) : [];

  useEffect(() => {
    dispatch(resetBrands());
    dispatch(getBrandsThunk());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!brands || rows.length === 0) return <></>;

  return (
    <>
      <HelmetMeta title="Brands" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" sx={{ mb: 5 }}>
          Brands
        </Typography>
        <Paper variant="outlined" sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 700 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default Brand;
