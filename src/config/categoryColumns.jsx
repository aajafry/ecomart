import Actions from '../molecules/Actions';

export const categoryColumns = (onEdit, onDelete) => [
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
    field: "name",
    headerName: "Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "productsCount",
    headerName: "Products Count",
    headerClassName: "super-app-theme--header",
    type: "number",
    width: 130,
    renderCell: (params) => {
      return `${params.row?.products?.length || 0}`;
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
          onDelete={() => onDelete(params.row._id, params.row.name)}
        />
      );
    },
  },
];