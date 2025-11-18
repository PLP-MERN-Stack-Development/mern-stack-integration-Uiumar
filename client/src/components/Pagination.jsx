export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        style={{ marginRight: "10px" }}
      >
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        style={{ marginLeft: "10px" }}
      >
        Next
      </button>
    </div>
  );
}
