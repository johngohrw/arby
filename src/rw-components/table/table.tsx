import {
  flexRender,
  getCoreRowModel,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table";

type CustomTableProps<T> = {
  getCoreRowModel?: TableOptions<T>["getCoreRowModel"] | undefined;
};
type OmittedProps<T> = keyof CustomTableProps<T>;

export const useTable = <T,>({
  ...options
}: Omit<TableOptions<T>, OmittedProps<T>> & CustomTableProps<T>) => {
  const table = useReactTable({
    ...options,
    getCoreRowModel: options.getCoreRowModel ?? getCoreRowModel(),
  });

  const renderTable = () => (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );

  return { renderTable, table };
};
