import { Pagination } from "@mui/material";


export default function BasicPagination({ pagination, setPagination , numberOfItemsInThePage }) {
  const handlePageChange = (event, page) => {
    const from = (page - 1) * numberOfItemsInThePage;
    const to = page * numberOfItemsInThePage;
    setPagination((prev) => {
      return {
        ...prev,
        from: from,
        to: to,
      };
    });
  };
  return (
    <Pagination
      count={Math.ceil(pagination?.count / numberOfItemsInThePage)}
      onChange={handlePageChange}
      color="primary"
    />
  );
}
