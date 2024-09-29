import { alpha } from "@mui/material";
import { gridClasses } from "@mui/x-data-grid";

const EVEN_OPACITY = 0.5;

export const stripedGridStyle = (theme) => ({
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: alpha(theme ? "#0F172A" : "#fff", EVEN_OPACITY),
    "&:hover, &.Mui-hovered": {
      backgroundColor: theme ? "#0F172A" : "#fff",
      "@media (hover: none)": { backgroundColor: "transparent" },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(theme ? "#0F172A" : "#fff", EVEN_OPACITY + 0.12),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(theme ? "#0F172A" : "#fff", EVEN_OPACITY + 0.24),
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme ? "#0F172A" : "#fff",
            EVEN_OPACITY + 0.12
          ),
        },
      },
    },
  },
  color: theme ? "#DAD9D9" : "#333333",
  "& .MuiDataGrid-root, .MuiDataGrid-main": {
    height: "100%",
  },
  "& .super-app-theme--header, .super-app-theme--header:hover": {
    backgroundColor: `${theme ? "#0F172A" : "#fff"} !important`,
    color: `${theme ? "#fff" : "#0F172A"} !important`,
  },
  border: 0,
  "& .MuiDataGrid-cell": {
    borderColor: `${theme ? "#374151" : "#E5E7EB"}`,
  },
  "& .MuiDataGrid-columnHeaders": {
    borderBottom: `none !important`,
  },
  "& .MuiTablePagination-root": {
    color: `${theme ? "#fff" : "#0F172A"} !important`,
  },
  "& .MuiDataGrid-toolbarContainer .MuiButtonBase-root": {
    color: `${theme ? "#fff" : "#000"} !important`,
  },
  "& .MuiDataGrid-root": {
    transition: "all 500ms ease",
  },
  "--DataGrid-overlayHeight": "200px",
});
