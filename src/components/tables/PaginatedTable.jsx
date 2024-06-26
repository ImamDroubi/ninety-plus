import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { TableHead } from "@mui/material";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// function createData(date, paymentMethod, amount, status) {
//   return { date, paymentMethod, amount, status };
// }

// const rows = [
//   createData("21-Sep-2021 at 2:14 PM", "VISA", 150, "قيد المعالجة"),
//   createData("21-Sep-2021 at 2:14 PM", "VISA", 150, "قيد المعالجة"),
//   createData("21-Sep-2021 at 2:14 PM", "VISA", 150, "مكتمل"),
//   createData("21-Sep-2021 at 2:14 PM", "VISA", 150, "مكتمل"),
//   createData("21-Sep-2021 at 2:14 PM", "VISA", 150, "ملغي"),
//   createData("21-Sep-2021 at 2:14 PM", "VISA", 150, "مكتمل"),
//   createData("21-Sep-2021 at 2:14 PM", "VISA", 150, "مكتمل"),
//   createData("21-Sep-2021 at 2:14 PM", "VISA", 150, "مكتمل"),
//   createData("21-Sep-2021 at 2:14 PM", "VISA", 150, "مكتمل"),
// ].sort((a, b) => (a.amount < b.amount ? -1 : 1));

export default function PaginatedTable({
  data = [],
  headers = ["العمود الأول", "العمود الثاني", "العمود الثالث", "العمود الرابع"],
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {headers?.map((header, key) => {
              return (
                <TableCell
                  style={{ backgroundColor: "#FF6636", color: "#ffffff" }}
                  key={key}
                  align="right"
                >
                  {header}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row, key) => (
            <TableRow key={key}>
              {row.map((item, key) => {
                return (
                  <TableCell key={key} style={{ maxWidth: 160 }} align="right">
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
            // <TableRow key={key}>
            //   <TableCell
            //     style={{ maxWidth: 160 }}
            //     component="th"
            //     scope="row"
            //     align="right"
            //   >
            //     {row.date}
            //   </TableCell>
            //   <TableCell style={{ maxWidth: 160 }} align="right">
            //     {row.paymentMethod}
            //   </TableCell>
            //   <TableCell style={{ maxWidth: 160 }} align="right">
            //     {row.amount}
            //   </TableCell>
            //   <TableCell style={{ maxWidth: 160 }} align="right">
            //     {row.status}
            //   </TableCell>
            // </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "الكل", value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={"عدد الصفوف"}
              page={page}
              slotprops={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
