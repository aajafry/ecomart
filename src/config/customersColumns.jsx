import Actions from "../molecules/Actions";

export const customersColumns = (onDelete) => [
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
    field: "email",
    headerName: "Email",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Phone",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    renderCell: (params) => {
      return (
        <p className="flex items-center h-full">
          {params?.row.phone
            ? `${params?.row.phone.substring(
                0,
                3
              )}-${params?.row.phone.substring(
                3,
                6
              )}-${params?.row.phone.substring(6, 10)}`
            : "Phone number not provided"}
        </p>
      );
    },
  },
  {
    field: "address",
    headerName: "Address",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    renderCell: (params) => {
      return (
        <p className="text-sm flex items-center flex-wrap text-wrap h-full">
          {params?.row.address &&
          params?.row.city &&
          params?.row.state &&
          params?.row.zipCode
            ? `${params?.row.address}, ${params?.row.city}, ${params?.row.state}, ${params?.row.zipCode}`
            : "Address not provided"}
        </p>
      );
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
          onDelete={() => onDelete(params.row._id, params.row.name)}
        />
      );
    },
  },
];