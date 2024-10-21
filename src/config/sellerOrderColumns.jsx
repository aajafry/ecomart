
import { IoEye } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdCancel } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import moment from "moment";

export const sellerOrderColumns = (onUpdateStatus, onAcceptRefund, onCancel) => [
  {
    field: "order id",
    headerName: "Order ID",
    headerClassName: "super-app-theme--header",
    type: "number",
    width: 90,
    sortable: false,
    editable: false,
    filterable: false,
    renderCell: (params) => {
      return <p>{params.id.slice(-6, params.id.length)}</p>;
    },
  },
  {
    field: "products",
    headerName: "Products",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
    renderCell: (params) => {
      return params.row.carts.map((item) => (
        <p
          key={item._id}
          className="text-sm flex justify-center flex-wrap flex-col text-pretty"
        >
          - {item.name}
        </p>
      ));
    },
  },
  {
    field: "createdAt",
    headerName: "Order Date",
    headerClassName: "super-app-theme--header",
    type: "string",
    width: 130,
    renderCell: (params) => {
      return moment(params.row.createdAt).format("YYYY-MM-DD");
    }
  },
  {
    field: "finalTotal",
    headerName: "Total",
    headerClassName: "super-app-theme--header",
    type: "number",
    width: 130,
  },
  {
    field: "paymentStatus",
    headerName: "Payment Status",
    headerClassName: "super-app-theme--header",
    type: "string",
    width: 130,
    renderCell: (params) => {
      return <p>{params.row.payment.status}</p>;
    },
  },
  {
    field: "status",
    headerName: "Delivery Status",
    headerClassName: "super-app-theme--header",
    type: "string",
    width: 130,
  },
  {
    field: "action",
    headerName: "Action",
    headerClassName: "super-app-theme--header",
    width: 130,
    renderCell: (params) => {
      const { status, payment } = params.row
      return (
        <div className="h-full flex items-center gap-3 cursor-pointer">
          <IoEye
            size="22"
            key={`${params.id}-preview`}
            onClick={() => alert(`${params.id} preview`)}
          />
          {!["delivered", "canceled", "refunded"].includes(status) && (
            <LiaShippingFastSolid
              size="22"
              key={`${params.id}-update`}
              onClick={() => onUpdateStatus(params.id)}
            />
          )}
          {payment.status === "paid" && payment.status !== "refunded" && (
            <SiTicktick
              size="22"
              key={`${params.id}-accept-refund`}
              onClick={() => onAcceptRefund(params.id)}
            />
          )}

          {!["delivered", "canceled", "refunded"].includes(status) && (
            <MdCancel
              size="22"
              key={`${params.id}-cancel`}
              onClick={() => onCancel(params.id)}
            />
          )}
        </div>
      );
    },
  },
];