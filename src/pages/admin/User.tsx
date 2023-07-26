// Demo component

import {
  Typography,
  Box,
  Toolbar,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Checkbox,
} from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC, useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialReactTable, {
  type MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import { Delete, Edit, Add } from '@mui/icons-material';
import { User, NewUser } from 'modals/User';

import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import {
  getUsersThunk,
  postUserThunk,
  deleteUserThunk,
} from 'app/store/features/user/userThunk';
import { format } from 'date-fns';

interface CreateModalProps {
  columns: MRT_ColumnDef<NewUser>[];
  onClose: () => void;
  onSubmit: (values: NewUser) => void;
  open: boolean;
}

// example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [values, setValues] = useState<NewUser>({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const handleSubmit = () => {
    // put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const UserPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<User[]>([]);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const users = useAppSelector((state) => state.user.users.data);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsersThunk());
    }
  }, [dispatch, users]);

  useEffect(() => {
    setTableData(users);
  }, [users]);

  const validateRequired = (value: string) => !!value.length;
  const validateEmail = (email: string) =>
    !!email.length &&
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  const validateAge = (age: number) => age >= 18 && age <= 50;

  const handleCreateNewRow = async (values: NewUser) => {
    await dispatch(postUserThunk(values));
    dispatch(getUsersThunk());
  };

  const handleSaveRowEdits: MaterialReactTableProps<User>['onEditingRowSave'] =
    // async ({ exitEditingMode, row, values }) => {
    ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        tableData[row.index] = values;
        // send/receive api updates here, then refetch or update local table data for re-render
        setTableData([...tableData]);
        exitEditingMode(); // required to exit editing mode and close modal
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row: MRT_Row<User>) => {
      if (
        // eslint-disable-next-line no-restricted-globals, no-alert, @typescript-eslint/restrict-template-expressions
        !confirm(`Are you sure you want to delete ${row.getValue('name')}`)
      ) {
        return;
      }
      // send api delete request here, then refetch or update local table data for re-render
      await dispatch(deleteUserThunk(row.getValue('id')));
      await dispatch(getUsersThunk());
    },
    [dispatch],
  );

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<User>,
    ): MRT_ColumnDef<User>['muiTableBodyCellEditTextFieldProps'] => ({
      error: !!validationErrors[cell.id],
      helperText: validationErrors[cell.id],
      onBlur: (event) => {
        const isValid =
          // eslint-disable-next-line no-nested-ternary
          cell.column.id === 'email'
            ? validateEmail(event.target.value)
            : cell.column.id === 'age'
            ? validateAge(+event.target.value)
            : validateRequired(event.target.value);
        if (!isValid) {
          // set validation error for cell if invalid
          setValidationErrors({
            ...validationErrors,
            [cell.id]: `${cell.column.columnDef.header} is required`,
          });
        } else {
          // remove validation error for cell if valid
          delete validationErrors[cell.id];
          setValidationErrors({
            ...validationErrors,
          });
        }
      },
    }),
    [validationErrors],
  );

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 40,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email',
        }),
      },
      {
        accessorKey: 'name',
        header: 'Name',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'address',
        header: 'Address',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'string',
        }),
      },
      {
        accessorKey: 'is_active',
        header: 'Is Active',
        size: 50,
        // eslint-disable-next-line react/no-unstable-nested-components, react/prop-types
        Cell: ({ cell }) => (
          <Checkbox
            // eslint-disable-next-line react/prop-types
            checked={!!cell.getValue()}
            disabled
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        ),
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'boolean',
        }),
      },
      {
        accessorKey: 'created_at',
        header: 'Created At',
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'string',
        }),
      },
      {
        accessorKey: 'updated_at',
        header: 'Updated At',
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'string',
        }),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'string',
        }),
      },
      // {
      //   accessorKey: 'state',
      //   header: 'State',
      //   muiTableBodyCellEditTextFieldProps: {
      //     select: true, // change to select for a dropdown
      //     children: states.map((state) => (
      //       <MenuItem key={state} value={state}>
      //         {state}
      //       </MenuItem>
      //     )),
      //   },
      // },
    ],
    [getCommonEditTextFieldProps],
  );

  const newColumns = useMemo<MRT_ColumnDef<NewUser>[]>(
    () => [
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'password',
        header: 'Password',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
    ],
    [],
  );

  return (
    <>
      <HelmetMeta title={t('dashboard.title')} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box display="flex" sx={{ mb: 3, justifyContent: 'space-between' }}>
          <Typography variant="h4">Users</Typography>
          <Button
            color="primary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
            startIcon={<Add />}
          >
            Create New Account
          </Button>
        </Box>
        <Paper variant="outlined" sx={{ width: '100%', overflow: 'hidden' }}>
          <MaterialReactTable
            displayColumnDefOptions={{
              'mrt-row-actions': {
                muiTableHeadCellProps: {
                  align: 'center',
                },
                size: 120,
              },
            }}
            initialState={{ density: 'compact' }}
            columns={columns}
            data={users ?? []}
            state={{
              isLoading: useAppSelector((state) => state.user.users.loading),
            }}
            editingMode="modal" // default
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={handleCancelRowEdits}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => table.setEditingRow(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
          <CreateNewAccountModal
            columns={newColumns}
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
          />
        </Paper>
      </Box>
    </>
  );
};

export default UserPage;
