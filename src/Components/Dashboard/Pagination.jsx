import ReactPaginate from 'react-paginate';
import './Pagination.css';

export default function PaginatedItems({ itemsPerPage, setPage, total }) {
  const pageCount = Math.ceil(total / itemsPerPage);

  const handlePageClick = (e) => {
    // window.scrollTo(0, 0);
    setPage(e.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center justify-content-center list-unstyled m-0 gap-2"
        pageLinkClassName="pagination-link"
        activeLinkClassName="active"
        previousLinkClassName="navigation-link"
        nextLinkClassName="navigation-link"
      />
    </>
  );
}
