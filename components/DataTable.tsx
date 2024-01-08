"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HealthStatusBadge from "./HealthStatusBadge";

const data: Food[] = [
  { name: "Apple", quantity: 10, health: "Healthy", price: 2.5 },
  { name: "Broccoli", quantity: 15, health: "Healthy", price: 3 },
  { name: "Chocolate", quantity: 5, health: "Unhealthy", price: 8 },
  { name: "Spinach", quantity: 20, health: "Healthy", price: 4 },
  { name: "Potato", quantity: 25, health: "Moderate", price: 1.5 },
  { name: "Chips", quantity: 12, health: "Unhealthy", price: 2 },
  { name: "Chicken", quantity: 8, health: "Unhealthy", price: 7 },
  { name: "Salmon", quantity: 6, health: "Healthy", price: 10 },
  { name: "Banana", quantity: 18, health: "Healthy", price: 2.8 },
  { name: "Rice", quantity: 22, health: "Moderate", price: 1.2 },
  { name: "Lettuce", quantity: 14, health: "Healthy", price: 2.2 },
  { name: "Beef", quantity: 7, health: "Unhealthy", price: 9 },
  { name: "Eggs", quantity: 30, health: "Healthy", price: 5 },
  { name: "Tomato", quantity: 16, health: "Healthy", price: 2.3 },
  { name: "Milk", quantity: 28, health: "Moderate", price: 3.5 },
  { name: "Yogurt", quantity: 10, health: "Healthy", price: 4 },
  { name: "Orange", quantity: 20, health: "Healthy", price: 3 },
  { name: "Pasta", quantity: 18, health: "Unhealthy", price: 2.7 },
  { name: "Turkey", quantity: 9, health: "Unhealthy", price: 8 },
  { name: "Onion", quantity: 24, health: "Healthy", price: 1.8 },
  { name: "Bread", quantity: 15, health: "Moderate", price: 2.5 },
  { name: "Butter", quantity: 19, health: "Unhealthy", price: 2.9 },
  { name: "Grapes", quantity: 23, health: "Healthy", price: 3.2 },
  { name: "Cabbage", quantity: 13, health: "Healthy", price: 2.1 },
  { name: "Pineapple", quantity: 11, health: "Moderate", price: 3.8 },
  { name: "Quinoa", quantity: 17, health: "Healthy", price: 6 },
  { name: "Cheese", quantity: 14, health: "Moderate", price: 4.5 },
  { name: "Palm Oil", quantity: 8, health: "Unhealthy", price: 12 },
  { name: "Honey", quantity: 21, health: "Healthy", price: 9.5 },
  { name: "Avocado", quantity: 26, health: "Healthy", price: 4.2 },
  { name: "Blueberries", quantity: 9, health: "Healthy", price: 7 },
  { name: "Mango", quantity: 23, health: "Healthy", price: 3.4 },
  { name: "Tofu", quantity: 11, health: "Unhealthy", price: 6 },
  { name: "Almonds", quantity: 17, health: "Healthy", price: 11 },
  { name: "Green Beans", quantity: 13, health: "Healthy", price: 2.6 },
  { name: "Soy Milk", quantity: 9, health: "Moderate", price: 4 },
  { name: "Pine Nuts", quantity: 21, health: "Healthy", price: 15 },
  { name: "Kale", quantity: 26, health: "Healthy", price: 3.5 },
  { name: "Blackberries", quantity: 7, health: "Healthy", price: 6.5 },
  { name: "Cucumber", quantity: 18, health: "Healthy", price: 1.7 },
  { name: "Oats", quantity: 15, health: "Healthy", price: 2.9 },
];

export type Food = {
  name: string;
  quantity: number;
  health: "Healthy" | "Unhealthy" | "Moderate";
  price: number;
};

export const columns: ColumnDef<Food>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=" ml-5 font-medium">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "health",
    header: () => <div className="text-center">Health</div>,
    cell: ({ row }) => {
      const healthStatus = String(row.getValue("health"));
      return <HealthStatusBadge healthAsset={healthStatus} />;
    },
  },
];

export function DataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
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
      <div className="rounded-md border">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
