import { createContext, type ReactNode } from "react";

interface TableContextType {
  columns?: string[];
}

interface TableProps {
  children: ReactNode;
  columns?: string[];
}

const TableContext = createContext<TableContextType | undefined>(undefined);

function Table({ children, columns }: TableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
      <TableContext.Provider value={{ columns }}>
        <table className="w-full">{children}</table>
      </TableContext.Provider>
    </div>
  );
}

function Header({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr className="border-b border-stone-200">
        {columns.map((column) => (
          <th
            key={column}
            className="p-3 text-left text-xs font-medium tracking-wider text-stone-600 uppercase"
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Body({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

function Row({ children }: { children: ReactNode }) {
  return (
    <tr className="border-b border-stone-200/60 transition-colors last:border-none hover:bg-stone-50">
      {children}
    </tr>
  );
}

function ImageCell({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <td className={`p-1 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="block h-12 w-18 rounded-lg object-cover"
      />
    </td>
  );
}
function TextCell({
  children,
  className = "text-stone-800",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={`p-3 text-sm font-medium ${className}`}>
      {children}
    </td>
  );
}

function ActionCell({ children }: { children: ReactNode }) {
  return <td className="p-3">{children}</td>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.ImageCell = ImageCell;
Table.TextCell = TextCell;
Table.ActionCell = ActionCell;

export default Table;
