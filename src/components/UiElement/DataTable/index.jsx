import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import "./datatable.css";

export function DataTable({
  options = { columns: [], rows: [] },
  title,
  subtitle,
  searchPlaceholder = "Search...",
  exportLabel = "Export CSV",
  onExport,
  summaryBar,
  emptyIcon = "bi-inbox",
  emptyTitle = "No records found",
  emptySubtitle = "Try changing your search or filters.",
  ...props
}) {
  // ── All existing state & logic — untouched ──────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, order: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Column-level filter state: { [colKey]: string }
  const [colFilters, setColFilters] = useState({});
  // Which column's filter popover is open
  const [openFilter, setOpenFilter] = useState(null);

  const extractValue = (value) => {
    if (typeof value === "object" && value !== null && value.props) {
      if (value.props.userName) return value.props.userName;
      if (value.props.children) return value.props.children.toString();
    }
    return value || "";
  };

  const filteredRows = useMemo(() => {
    let rows = options.rows;
    // global search
    if (searchQuery) {
      rows = rows.filter((row) =>
        options.columns.some((col) => {
          const cellValue = extractValue(row[col.key]);
          return cellValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
        })
      );
    }
    // per-column filters
    Object.entries(colFilters).forEach(([key, val]) => {
      if (!val) return;
      rows = rows.filter((row) => {
        const cellValue = extractValue(row[key]);
        return cellValue.toString().toLowerCase().includes(val.toLowerCase());
      });
    });
    return rows;
  }, [options.rows, options.columns, searchQuery, colFilters]);

  const sortedRows = useMemo(() => {
    if (sortConfig.key) {
      return [...filteredRows].sort((a, b) => {
        const aValue = extractValue(a[sortConfig.key]);
        const bValue = extractValue(b[sortConfig.key]);
        if (aValue < bValue) return sortConfig.order === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.order === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filteredRows;
  }, [filteredRows, sortConfig]);

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedRows.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedRows, currentPage, rowsPerPage]);

  const handleSort = (key) => {
    let newOrder = "asc";
    if (sortConfig.key === key && sortConfig.order === "asc") {
      newOrder = "desc";
    }
    setSortConfig({ key, order: newOrder });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleColFilterChange = (key, val) => {
    setColFilters((prev) => ({ ...prev, [key]: val }));
    setCurrentPage(1);
  };

  const toggleFilter = (key) => {
    setOpenFilter((prev) => (prev === key ? null : key));
  };

  const renderCellContent = (col, row) => {
    return row[col.key] || "-";
  };

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);

  // Pagination window: max 5 page numbers centered around current page
  const pageWindow = useMemo(() => {
    const delta = 2;
    const pages = [];
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
    for (let i = left; i <= right; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  const startRecord = sortedRows.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRecord = Math.min(currentPage * rowsPerPage, sortedRows.length);
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="dt-wrapper">

      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <div className="dt-topbar">
        <div className="dt-topbar-left">
          {title && <div className="dt-title">{title}</div>}
          {subtitle && <div className="dt-subtitle">{subtitle}</div>}
        </div>
        <div className="dt-topbar-right">
          <div className="dt-search-wrap">
            <i className="bi bi-search dt-search-icon" aria-hidden="true" />
            <input
              type="search"
              className="dt-search-input"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {onExport && (
            <button className="dt-export-btn" onClick={onExport} type="button">
              <i className="bi bi-download" aria-hidden="true" />
              <span>{exportLabel}</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Table ────────────────────────────────────────────────────── */}
      <div className="dt-table-wrap">
        <table className="dt-table" {...props}>
          <thead>
            <tr>
              {options.columns.map((col, index) => {
                const isActive = sortConfig.key === col.key;
                const hasFilter = col.filter;
                const isFilterOpen = openFilter === col.key;
                return (
                  <th
                    key={index}
                    className={`dt-th${col.extraClass ? ` ${col.extraClass}` : ""}${isActive ? " dt-th-active" : ""}`}
                    style={{ width: col.width || undefined }}
                  >
                    <div className="dt-th-inner">
                      {/* Sort trigger */}
                      <span
                        className={`dt-th-label${col.sorting ? " dt-th-sortable" : ""}`}
                        onClick={col.sorting ? () => handleSort(col.key) : undefined}
                      >
                        {col.title}
                        {col.sorting && (
                          <span className="dt-sort-icons">
                            <i
                              className={`bi bi-caret-up-fill dt-sort-up${isActive && sortConfig.order === "asc" ? " dt-sort-on" : ""}`}
                              aria-hidden="true"
                            />
                            <i
                              className={`bi bi-caret-down-fill dt-sort-down${isActive && sortConfig.order === "desc" ? " dt-sort-on" : ""}`}
                              aria-hidden="true"
                            />
                          </span>
                        )}
                      </span>

                      {/* Column filter button */}
                      {hasFilter && (
                        <div className="dt-col-filter-wrap">
                          <button
                            type="button"
                            className={`dt-col-filter-btn${colFilters[col.key] ? " dt-col-filter-active" : ""}${isFilterOpen ? " dt-col-filter-open" : ""}`}
                            onClick={() => toggleFilter(col.key)}
                            title={`Filter ${col.title}`}
                          >
                            <i className="bi bi-funnel-fill" aria-hidden="true" />
                          </button>

                          {isFilterOpen && (
                            <div className="dt-col-filter-popover">
                              <input
                                autoFocus
                                type="text"
                                className="dt-col-filter-input"
                                placeholder={`Filter ${col.title}...`}
                                value={colFilters[col.key] || ""}
                                onChange={(e) => handleColFilterChange(col.key, e.target.value)}
                                onKeyDown={(e) => e.key === "Escape" && setOpenFilter(null)}
                              />
                              {colFilters[col.key] && (
                                <button
                                  type="button"
                                  className="dt-col-filter-clear"
                                  onClick={() => {
                                    handleColFilterChange(col.key, "");
                                    setOpenFilter(null);
                                  }}
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="dt-row">
                  {options.columns.map((col, colIndex) => (
                    <td key={colIndex} className="dt-td">
                      {renderCellContent(col, row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={options.columns.length} className="dt-empty">
                  <div className="dt-empty-inner">
                    <div className="dt-empty-icon">
                      <i className={`bi ${emptyIcon}`} aria-hidden="true" />
                    </div>
                    <p className="dt-empty-title">{emptyTitle}</p>
                    <p className="dt-empty-sub">{emptySubtitle}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Optional summary slot */}
      {summaryBar}

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <div className="dt-footer">
        <div className="dt-footer-info">
          {sortedRows.length > 0 ? (
            <>
              Showing {startRecord}–{endRecord} of{" "}
              <strong>{sortedRows.length.toLocaleString()}</strong> records
            </>
          ) : (
            "No data available"
          )}
          <span className="dt-rows-per-page">
            &nbsp;&nbsp;Rows per page
            <select
              className="dt-rpp-select"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </span>
        </div>

        <div className="dt-pagination">
          {/* Previous */}
          <button
            type="button"
            className="dt-page-btn dt-page-prev"
            disabled={currentPage === 1}
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          >
            Previous
          </button>

          {/* First page + ellipsis */}
          {pageWindow[0] > 1 && (
            <>
              <button type="button" className="dt-page-btn" onClick={() => handlePageChange(1)}>1</button>
              {pageWindow[0] > 2 && <span className="dt-page-ellipsis">…</span>}
            </>
          )}

          {/* Page window */}
          {pageWindow.map((page) => (
            <button
              key={page}
              type="button"
              className={`dt-page-btn${currentPage === page ? " dt-page-active" : ""}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          {/* Last page + ellipsis */}
          {pageWindow[pageWindow.length - 1] < totalPages && (
            <>
              {pageWindow[pageWindow.length - 1] < totalPages - 1 && (
                <span className="dt-page-ellipsis">…</span>
              )}
              <button
                type="button"
                className="dt-page-btn"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next */}
          <button
            type="button"
            className="dt-page-btn dt-page-next"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Click-away to close filter popovers */}
      {openFilter && (
        <div className="dt-filter-backdrop" onClick={() => setOpenFilter(null)} />
      )}
    </div>
  );
}

DataTable.propTypes = {
  options: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        sorting: PropTypes.bool,
        filter: PropTypes.bool,
        extraClass: PropTypes.string,
        width: PropTypes.string,
      })
    ).isRequired,
    rows: PropTypes.array.isRequired,
  }).isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  exportLabel: PropTypes.string,
  onExport: PropTypes.func,
  summaryBar: PropTypes.node,
  emptyIcon: PropTypes.string,
  emptyTitle: PropTypes.string,
  emptySubtitle: PropTypes.string,
};
