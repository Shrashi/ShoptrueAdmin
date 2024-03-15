"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Input from "./Input";
// import CellAction from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/CellAction";

type AlignProps = "center" | "inherit" | "justify" | "left" | "right";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: AlignProps;
}

interface TableProps {
  columns: Column[];
  data: any;
  searchKey: string;
  hasActions?: boolean;
  renderAction?: (row: any) => React.ReactNode;
}

const DataTable: React.FC<TableProps> = ({
  columns,
  data,
  searchKey,
  hasActions = false,
  renderAction,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [shownRows, setShownRows] = React.useState([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    setShownRows(data);
  }, [data]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const filteredRows = data.filter((d: any) =>
        d[searchKey].includes(event.target.value)
      );
      setShownRows(filteredRows);
    } else {
      setShownRows(data);
    }
  };

  const renderComp = (column: any, row: any) => {
    let RenderedComp;
    if (column.id === "action" && hasActions && renderAction) {
      RenderedComp = renderAction(row);
    } else {
      if (column.id === "isFeatured") {
        console.log("featured", row[column.id]);
      }
      RenderedComp = <div>{String(row[column.id])}</div>;
    }
    return RenderedComp;
  };

  return (
    <div>
      <Input
        size={40}
        className="mb-5"
        placeholder="Search here..."
        onChange={handleChangeInput}
      />
      <Paper className="w-full overflow-hidden">
        <TableContainer className="max-h-[440px]">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className="bg-inherit">
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {shownRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => {
                  console.log("row", row);
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {renderComp(column, row)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default DataTable;
