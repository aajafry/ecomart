/* eslint-disable react/prop-types */
import moment from "moment/moment";

function OrderSnapshot({id, createdAt, deliveredAt, status}) {
  return (
    <div className="mb-4 text-sm flex justify-between flex-col md:flex-row">
      <p>
        <span className="font-medium">Order ID:</span> {id}
      </p>
      <div>
        <p>
          <span className="font-medium">Placed On:</span>{" "}
          {moment(createdAt).format("YYYY-MM-DD")}
        </p>
        <p>
          <span className="font-medium">Delivered At:</span>{" "}
          {moment(deliveredAt).format("YYYY-MM-DD")}
        </p>
        <p className="font-medium">
          Order Status: <span className="text-amber-500">{status}</span>
        </p>
      </div>
    </div>
  );
}

export default OrderSnapshot