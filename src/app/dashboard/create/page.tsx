import { fetchInvestments } from "@/app/lib/data";
import CreateForm from "@/app/ui/dashboard/create-form";

export default async function Page() {
  const customers = await fetchInvestments();

  return (
    <main>
      {/* TODO: Im not sure what the purpose of this is */}
      {/* <Breadcrumbs
          breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
              label: 'Create Invoice',
              href: '/dashboard/invoices/create',
              active: true,
            },
          ]}
        /> */}
      <CreateForm customers={customers} />
    </main>
  );
}
