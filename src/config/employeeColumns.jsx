import Actions from "../molecules/Actions";
import moment from "moment/moment";

export const employeeColumns = (onEdit, onDelete) => [
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
    field: "role",
    headerName: "Role",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Joining Date",
    headerClassName: "super-app-theme--header",
    type: "string",
    width: 130,
    renderCell: (params) => {
      return moment(params.row.createdAt).format("YYYY-MM-DD");
    }
  },
  {
    field: "salary",
    headerName: "Salary",
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
          onEdit={() => onEdit(params.row._id)}
          onDelete={() => onDelete(params.row._id, params.row.name)}
        />
      );
    },
  },
];