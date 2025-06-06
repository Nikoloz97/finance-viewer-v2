import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  defaultDropdownItemStyling,
} from "@/components/ui/dropdown-menu";
import {
  EditTableStatementFormData,
  TableStatement,
} from "@/lib/models/investments";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import CustomAlertDialog from "../utils/custom-alert-dialog";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "./investments.css";

interface DataTableProps {
  data: TableStatement[];
  handleEditStatementTableClick: (
    tableStatement: EditTableStatementFormData
  ) => void;
  handleDeleteStatement: (investmentId: string, statementId: string) => void;
}

export function InvestmentsTable({
  data,
  handleEditStatementTableClick,
  handleDeleteStatement,
}: DataTableProps) {
  const InvestmentsColumns: ColumnDef<TableStatement>[] = [
    {
      accessorKey: "brokerageName",
      header: "Brokerage Name",
    },
    {
      accessorKey: "type",
      header: "Investment Type",
    },
    {
      accessorKey: "subtype",
      header: "Investment Subtype",
    },
    {
      accessorKey: "startBalance",
      header: "Start Balance",
      cell: ({ row }) => {
        const startBalance = parseFloat(row.getValue("startBalance"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(startBalance);

        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => {
        const startDate = new Date(row.getValue("startDate"));
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }).format(startDate);

        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: "endBalance",
      header: "End Balance",
      cell: ({ row }) => {
        const startBalance = parseFloat(row.getValue("endBalance"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(startBalance);

        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => {
        const endDate = new Date(row.getValue("endDate"));
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }).format(endDate);

        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: "depositAmount",
      header: "Deposit Amount",
      cell: ({ row }) => {
        const depositAmount = parseFloat(row.getValue("depositAmount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(depositAmount);

        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "withdrawalAmount",
      header: "Withdrawal Amount",
      cell: ({ row }) => {
        const withdrawalAmount = parseFloat(row.getValue("withdrawalAmount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(withdrawalAmount);

        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "statementId",
      header: "Statement ID",
    },
    {
      accessorKey: "investmentId",
      header: "Investment ID",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const tableStatement = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleEditStatementTableClick(tableStatement)}
              >
                Edit statement
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(event) => event.preventDefault()}>
                <CustomAlertDialog
                  triggerText="Delete statement"
                  title="Delete Statement?"
                  description="This action cannot be undone"
                  customTriggerClassName={defaultDropdownItemStyling}
                  triggerStyle={{
                    padding: "0",
                    fontFamily:
                      "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                  }}
                  onContinueClick={() =>
                    handleDeleteStatement(
                      tableStatement.investmentId,
                      tableStatement._id!
                    )
                  }
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  useEffect(() => {
    const defaultHiddenColumns = {
      depositAmount: false,
      withdrawalAmount: false,
      statementId: false,
      investmentId: false,
    };

    setColumnVisibility(defaultHiddenColumns);
  }, []);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: InvestmentsColumns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility,
      columnFilters,
    },
  });

  return (
    <div
      className="rounded-md text-center min-h-full"
      style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
    >
      <div className="flex py-4 justify-between">
        <Input
          placeholder="Filter by brokerage..."
          value={
            (table.getColumn("brokerageName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("brokerageName")?.setFilterValue(event.target.value)
          }
          className="dark text-white w-1/2 mx-2"
          style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="dark mx-2"
              style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
            >
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={InvestmentsColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
