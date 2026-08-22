import PropTypes from "prop-types";
import "./datatable.css";
import { useMemo, useState } from "react";

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

  // ── Server-driven state (all controlled by parent) ──────────────
  searchQuery = "",
  onSearchChange,

  sortConfig = { key: null, order: "asc" },
  onSortChange,

  colFilters = {},
  onColFilterChange,

  currentPage = 1,
  rowsPerPage = 10,
  totalItems = 0,
  onPageChange,
  onRowsPerPageChange,

  loading = false,
  ...props
}) {
  const [openFilter, setOpenFilter] = useState(null);

  const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;

  const pageWindow = useMemo(() => {
    const delta = 2;
    const pages = [];
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
    for (let i = left; i <= right; i++) pages.push(i);
    return pages;
  }, [currentPage, totalPages]);

  const startRecord = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRecord = Math.min(currentPage * rowsPerPage, totalItems);

  const toggleFilter = (key) => setOpenFilter((prev) => (prev === key ? null : key));

  const handleSort = (key) => {
    let newOrder = "asc";
    if (sortConfig.key === key && sortConfig.order === "asc") newOrder = "desc";
    onSortChange?.({ key, order: newOrder });
  };

  return (
    <div className="dt-wrapper">
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
              onChange={(e) => onSearchChange?.(e.target.value)}
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
                      <span
                        className={`dt-th-label${col.sorting ? " dt-th-sortable" : ""}`}
                        onClick={col.sorting ? () => handleSort(col.key) : undefined}
                      >
                        {col.title}
                        {col.sorting && (
                          <span className="dt-sort-icons">
                            <i className={`bi bi-caret-up-fill dt-sort-up${isActive && sortConfig.order === "asc" ? " dt-sort-on" : ""}`} />
                            <i className={`bi bi-caret-down-fill dt-sort-down${isActive && sortConfig.order === "desc" ? " dt-sort-on" : ""}`} />
                          </span>
                        )}
                      </span>

                      {hasFilter && (
                        <div className="dt-col-filter-wrap">
                          <button
                            type="button"
                            className={`dt-col-filter-btn${colFilters[col.key] ? " dt-col-filter-active" : ""}${isFilterOpen ? " dt-col-filter-open" : ""}`}
                            onClick={() => toggleFilter(col.key)}
                            title={`Filter ${col.title}`}
                          >
                            <i className="bi bi-funnel-fill" />
                          </button>
                          {isFilterOpen && (
                            <div className="dt-col-filter-popover">
                              <input
                                autoFocus
                                type="text"
                                className="dt-col-filter-input"
                                placeholder={`Filter ${col.title}...`}
                                value={colFilters[col.key] || ""}
                                onChange={(e) => onColFilterChange?.(col.key, e.target.value)}
                                onKeyDown={(e) => e.key === "Escape" && setOpenFilter(null)}
                              />
                              {colFilters[col.key] && (
                                <button
                                  type="button"
                                  className="dt-col-filter-clear"
                                  onClick={() => {
                                    onColFilterChange?.(col.key, "");
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
            {loading ? (
              <tr>
                <td colSpan={options.columns.length} className="dt-empty">
                  <div className="dt-empty-inner">
                    <p className="dt-empty-title">Loading...</p>
                  </div>
                </td>
              </tr>
            ) : options?.rows?.length > 0 ? (
              options?.rows?.map((row, rowIndex) => (
                <tr key={row.id ?? rowIndex} className="dt-row">
                  {options.columns.map((col, colIndex) => (
                    <td key={colIndex} className={`dt-td${col.extraClass ? ` ${col.extraClass}` : ""}`}>
                      {row[col.key] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={options.columns.length} className="dt-empty">
                  <div className="dt-empty-inner">
                    <div className="dt-empty-icon">
                      <i className={`bi ${emptyIcon}`} />
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

      {summaryBar}

      <div className="dt-footer">
        <div className="dt-footer-info">
          {totalItems > 0 ? (
            <>
              Showing {startRecord}–{endRecord} of{" "}
              <strong>{totalItems.toLocaleString()}</strong> records
            </>
          ) : (
            "No data available"
          )}
          <span className="dt-rows-per-page">
            &nbsp;&nbsp;Rows per page
            <select
              className="dt-rpp-select"
              value={rowsPerPage}
              onChange={(e) => onRowsPerPageChange?.(parseInt(e.target.value, 10))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </span>
        </div>

        <div className="dt-pagination">
          <button
            type="button"
            className="dt-page-btn dt-page-prev"
            disabled={currentPage === 1}
            onClick={() => onPageChange?.(currentPage - 1)}
          >
            Previous
          </button>

          {pageWindow[0] > 1 && (
            <>
              <button type="button" className="dt-page-btn" onClick={() => onPageChange?.(1)}>1</button>
              {pageWindow[0] > 2 && <span className="dt-page-ellipsis">…</span>}
            </>
          )}

          {pageWindow.map((page) => (
            <button
              key={page}
              type="button"
              className={`dt-page-btn${currentPage === page ? " dt-page-active" : ""}`}
              onClick={() => onPageChange?.(page)}
            >
              {page}
            </button>
          ))}

          {pageWindow[pageWindow.length - 1] < totalPages && (
            <>
              {pageWindow[pageWindow.length - 1] < totalPages - 1 && (
                <span className="dt-page-ellipsis">…</span>
              )}
              <button type="button" className="dt-page-btn" onClick={() => onPageChange?.(totalPages)}>
                {totalPages}
              </button>
            </>
          )}

          <button
            type="button"
            className="dt-page-btn dt-page-next"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => onPageChange?.(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {openFilter && <div className="dt-filter-backdrop" onClick={() => setOpenFilter(null)} />}
    </div>
  );
}