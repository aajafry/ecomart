import TableGrid from "../../atoms/TableGrid";
import { ShopCustomersColumns, ShopCustomersRows } from "../../constants/data";
import PageHeader from "../../molecules/PageHeader";


function ShopUsers() {
  return (
    <div className="transition-all duration-500 ease-linear">
      <PageHeader 
        heading="Customers"
      />

      <TableGrid  
        rows={ShopCustomersRows}
        columns={ShopCustomersColumns} 
      />
    </div>
  );
}

export default ShopUsers;
