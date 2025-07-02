import { Metadata } from "next";
import { Suspense } from "react";
import { fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";

export const metadata: Metadata = {
  title: 'Customers'
};


export default async function Page() {
  const customer = await fetchFilteredCustomers('');

    return (
      <main>
        <div className="w-full">
          <div className="mt-6">
            <Suspense fallback={<p>Loading customers...</p>}>
              <CustomersTable customers={customer} />
            </Suspense>
          </div>    
        </div>
      </main>
    )
  }