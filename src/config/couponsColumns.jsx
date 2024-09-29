import Actions from '../molecules/Actions';

export const couponsColumns = (onEdit, onDelete) => [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "super-app-theme--header",
    type: "number",
    width: 90,
    sortable: false,
    editable: false,
    filterable: false,
  },
  {
    field: "code",
    headerName: "Code",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "validFrom",
    headerName: "Start Date",
    headerClassName: "super-app-theme--header",
    type: "string",
    width: 130,
  },
  {
    field: "validTo",
    headerName: "End Date",
    headerClassName: "super-app-theme--header",
    type: "string",
    width: 130,
  },
  {
    field: "usageLimit",
    headerName: "Usage Limit",
    headerClassName: "super-app-theme--header",
    type: "number",
    width: 130,
    renderCell: (params) => {
      return params.row.usageLimit ? params.row.usageLimit : "unlimited";
    },
  },
  {
    field: "usedCount",
    headerName: "Usage Count",
    headerClassName: "super-app-theme--header",
    type: "number",
    width: 130,
    renderCell: (params) => {
      return params.row.usedCount ? params.row.usedCount : 0;
    },
  },
  {
    field: "action",
    headerName: "Action",
    headerClassName: "super-app-theme--header",
    flex: 1,
    renderCell: (params) => {
      return (
        <Actions
          params={params}
          onEdit={() => onEdit(params.row._id)}
          onDelete={() => onDelete(params.row._id, params.row.code)}
        />
      );
    },
  },
];