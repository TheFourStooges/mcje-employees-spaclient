import React from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const DataTable = (props) => {
  const {
    rows,
    columns,
    totalResults,
    limit,
    loading,
    onPageChange,
    onPageSizeChange,
    rowDoubleClickHandler,
  } = props;

  return (
    <div style={{ height: '100%', display: 'flex' }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        rowCount={totalResults}
        pageSize={limit}
        rowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
        pagination
        paginationMode="server"
        loading={loading}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onRowDoubleClick={(params, evt, details) =>
          rowDoubleClickHandler(params.id)
        }
      />
    </div>
  );
};

export default DataTable;
