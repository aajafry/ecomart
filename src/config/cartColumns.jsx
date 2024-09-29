import { MdDelete } from "react-icons/md";
import { formatCurrency } from "../utilities/formatCurrency";

export const cartColumns = (onRemove, onUpdate) => [
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
    headerName: "Product",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
  {
    field: "price",
    headerName: "Unit Price",
    headerClassName: "super-app-theme--header",
    type: "number",
    flex: 1,
    renderCell: (params) => {
      return formatCurrency(params.row.price);
    } 
  },
  {
    field: "quantity",
    headerName: "Quantity",
    headerClassName: "super-app-theme--header",
    type: "number",
    flex: 1,
    editable: true,
    renderCell: (params) => {
      return (
        <input
          type="number"
          value={params.row.quantity}
          onChange={(e) =>
            onUpdate(params.row._id, Number(e.target.value))
          }
          onBlur={(e) =>
            onUpdate(params.row._id, Number(e.target.value))
          }
          className="w-full bg-transparent text-center outline-none border-none"
        />
      );
    },
  },
  {
    field: "total",
    headerName: "Total",
    headerClassName: "super-app-theme--header",
    type: "number",
    flex: 1,
    renderCell: (params) => {
      return formatCurrency(params.row.price * params.row.quantity);
    },
  },
  {
    field: "remove",
    headerName: "Remove",
    headerClassName: "super-app-theme--header",
    flex: 1,
    renderCell: (params) => {
      return (
        <MdDelete
          size="22"
          key={`${params.id}-remove`}
          title="remove from cart"
          onClick={() => onRemove(params.id)}
          className="h-full flex items-center cursor-pointer"
        />
      );
    },
  },
];
