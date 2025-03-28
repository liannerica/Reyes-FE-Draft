import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
} from "lucide-react";

interface Column {
  id: string;
  header: string;
  cell: (row: any) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
  searchPlaceholder?: string;
}

// Find and modify any text styling in the DataTable component
// Add these styles to text elements:

// For header text
const headerClasses = "font-semibold text-foreground";

// For muted text
const mutedClasses = "text-muted-admin";

// For cell text
const cellClasses = "text-foreground";

// Update the SearchBar component to use higher contrast text
// Change any text-muted-foreground to text-muted-admin where appropriate
// Add darker text for placeholders with placeholder:text-muted-admin

// Make sure table headers have strong contrast
// Add font-medium or font-semibold to table headers

export const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  searchPlaceholder = "Search...",
}: DataTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const itemsPerPage = 10;

  // Filter data based on search query
  const filteredData = data.filter((row) => {
    return Object.values(row).some((value) => {
      if (value === null || value === undefined) return false;
      return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;
    
    if (a[key] < b[key]) {
      return direction === "asc" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Paginate data
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-6 p-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2 space-y-3 sm:space-y-0">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            className="pl-10 max-w-sm bg-transparent"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.id}
                    className={
                      column.sortable ? "cursor-pointer select-none" : ""
                    }
                    onClick={() => {
                      if (column.sortable) {
                        handleSort(column.id);
                      }
                    }}
                  >
                    <div className="flex items-center gap-1">
                      {column.header}
                      {sortConfig && sortConfig.key === column.id && (
                        <span>
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="group">
                    {columns.map((column) => (
                      <TableCell key={`${rowIndex}-${column.id}`}>
                        {column.cell(row)}
                      </TableCell>
                    ))}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-50 group-hover:opacity-100 h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {onView && (
                            <DropdownMenuItem onClick={() => onView(row)}>
                              View details
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(row)}>
                              Edit
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => onDelete(row)}
                            >
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="h-32 text-center"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length}
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
            const pageNumber =
              currentPage <= 2
                ? i + 1
                : currentPage >= totalPages - 1
                ? totalPages - 2 + i
                : currentPage - 1 + i;

            if (pageNumber <= 0 || pageNumber > totalPages) return null;

            return (
              <Button
                key={pageNumber}
                variant={pageNumber === currentPage ? "outline" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(pageNumber)}
                className={pageNumber === currentPage ? "bg-[#AA8F66] text-white hover:bg-[#AA8F66]/90" : ""}
              >
                {pageNumber}
              </Button>
            );
          })}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
