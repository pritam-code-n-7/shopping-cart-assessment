interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  "aria-label": string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  "aria-label": ariaLabel,
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex justify-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          aria-label={ariaLabel}
          className={`px-3 py-1 mx-1 border ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : ""
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
