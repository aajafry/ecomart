import { MdRateReview } from "react-icons/md";

export const reviewCartColumns = (onReview) => [
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
  },
  {
    field: "quantity",
    headerName: "Quantity",
    headerClassName: "super-app-theme--header",
    type: "number",
    flex: 1,
  },
  {
    field: "total",
    headerName: "Total",
    headerClassName: "super-app-theme--header",
    type: "number",
    flex: 1,
    renderCell: (params) => {
      return params.row.price * params.row.quantity;
    },
  },
  {
    field: "review",
    headerName: "Review",
    headerClassName: "super-app-theme--header",
    flex: 1,
    renderCell: (params) => {
      return (
        <MdRateReview
          size="22"
          key={`${params.id}-review`}
          title="review"
          onClick={() => onReview(params.id)}
          className="h-full flex items-center cursor-pointer"
        />
      );
    },
  },
];
