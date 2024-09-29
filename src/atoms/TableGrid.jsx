/* eslint-disable react/prop-types */
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { stripedGridStyle } from "../config/stripedGridStyle";
import { useTheme } from "../contexts/ThemeContext";
import NoRowsOverlay from "./icons/NoRowsOverlay";

function TableGrid({rows, columns}) {
    const { isDark } = useTheme();
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      autoHeight={true}
      initialState={{
        columns: {
          columnVisibilityModel: {
            id: false,
          },
        },
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      slots={{
        toolbar: GridToolbar,
        noRowsOverlay: NoRowsOverlay,
      }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      getRowId={(row) => row._id}
      pageSizeOptions={[5, 10, 15, 20]}
      sx={stripedGridStyle(isDark)}
    />
  );
}

export default TableGrid