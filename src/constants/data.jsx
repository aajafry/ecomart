const ShopCustomersRows = [
  {
    _id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    address: "123 Main St, City, State, 12345",
  },
  {
    _id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "0987654321",
    address: "456 Elm St, City, State, 54321",
  },
  {
    _id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "2345678901",
    address: "789 Oak St, City, State, 67890",
  },
  {
    _id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    phone: "3456789012",
    address: "987 Maple St, City, State, 76543",
  },
  {
    _id: 5,
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    phone: "4567890123",
    address: "123 Pine St, City, State, 32109",
  },
  {
    _id: 6,
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "5678901234",
    address: "678 Birch St, City, State, 21098",
  },
];

const ShopCustomersColumns = [
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
  },
  {
    field: "address",
    headerName: "Address",
    headerClassName: "super-app-theme--header",
    type: "string",
    flex: 1,
  },
];

export {
  ShopCustomersColumns,
  ShopCustomersRows
};

