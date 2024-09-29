import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { formatCurrency } from "../utilities/formatCurrency";

export const wishlistColumns = (onAdd, onRemove) => [
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
    },
  },
  {
    field: "addToCart",
    headerName: "Add To Cart",
    headerClassName: "super-app-theme--header",
    flex: 1,
    renderCell: (params) => {
      return (
        <FaShoppingCart
          size="22"
          key={`${params.id}-add`}
          title="add to cart"
          onClick={() => onAdd(params.row)}
          className="h-full flex items-center cursor-pointer"
        />
      );
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
          title="remove from wishlist"
          onClick={() => onRemove(params.id)}
          className="h-full flex items-center cursor-pointer"
        />
      );
    },
  },
];
