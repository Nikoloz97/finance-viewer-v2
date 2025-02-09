// import { fetchInvestments } from "@/app/lib/data";
import CreateForm from "@/app/ui/dashboard/create-form";

export default async function Page() {
  //   const investments = await fetchInvestments();

  return (
    <main>
      {/* TODO: Im not sure what the purpose of this is (pasted in from next.js docs) */}
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
      <CreateForm />
    </main>
  );
}
