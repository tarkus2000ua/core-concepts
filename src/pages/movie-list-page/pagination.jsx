const Pagination = ({ page, totalPages, onPageChange }) => (
  <div className="pagination">
    <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
      &lt;&nbsp;Previous
    </button>
    <span>
      Page {page} of {totalPages}
    </span>
    <button
      onClick={() => onPageChange(page + 1)}
      disabled={page === totalPages}
    >
      Next&nbsp;&gt;
    </button>
  </div>
);

export default Pagination;
