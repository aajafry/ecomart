import Actions from "../molecules/Actions";

export const shopColumns = (onDelete) => [
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
    field: "brand",
    headerName: "Name",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "products",
    headerName: "Products",
    headerClassName: "super-app-theme--header",
    type: "number",
    width: 130,
    renderCell: (params) => {
      return params?.row.products.length || 0;
    },
  },
  {
    field: "sales",
    headerName: "Sales",
    headerClassName: "super-app-theme--header",
    type: "number",
    width: 130,
    renderCell: (params) => {
      return params?.row.orders.length || 0;
    },
  },
  {
    field: "balance",
    headerName: "Revenue",
    headerClassName: "super-app-theme--header",
    type: "number",
    width: 130,
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
          onDelete={() => onDelete(params.row._id, params.row.brand)}
        />
      );
    },
  },
];