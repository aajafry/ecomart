/* eslint-disable react/prop-types */

function ShippingDetails({
  name, 
  email, 
  phone, 
  address, 
  city, 
  state, 
  country, 
  zipCode, 
  orderNote
}) {
  return (
    <>
      <p>{name}</p>
      <p>{email}</p>
      <p>
        {phone?.substring(0, 3)}-
        {phone?.substring(3, 6)}-
        {phone?.substring(6, 10)}
      </p>
      <p>{address},</p>
      <p>
        {city}, {state},{" "}
        {country}-{zipCode}
      </p>
      <p>{orderNote}</p>
    </>
  );
}

export default ShippingDetails