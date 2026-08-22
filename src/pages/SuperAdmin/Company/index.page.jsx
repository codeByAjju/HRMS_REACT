import { Badge, DataTable } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AdminCompanyDashboard } from "../../../components";
import { SuperAdminCompanyServices } from "../../../Services/SuperAdmin/Company/index.service";
import { Dropdown } from "react-bootstrap";
import { SweetAlert } from "../../../components/UiElement/SweetAlert";

function SuperAdminCompanyDashboard() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalItems: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, order: "asc" });
  const [colFilters, setColFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function useDebouncedValue(value, delay = 400) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
      const timer = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(timer);
    }, [value, delay]);
    return debounced;
  }
  const getCompanyData = async () => {
    setIsLoading(true);
    try {
      const res = await SuperAdminCompanyServices.superAdminGetAllCompany();
      setCompanyData(res?.data?.result);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching company data");
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  const fetchCompanies = async (params) => {
    try {
      const res = await SuperAdminCompanyServices.superAdminGetAllCompany(params);
      return res;
    } catch (error) {
      toast.error("Error fetching company data");
      return error;
    }
  };
  // function formatNotification(notification) {
  //   console.log("notification", notification)
  //   return {
  //     ...notification,
  //     description: (
  //       <div>
  //         {notification.description.substring(0, 50)}
  //         {notification.description.length > 50 ? (
  //           <>
  //             {/* {'... '}
  //             <button
  //               size="sm"
  //               variant="link"
  //               className="p-0 ms-1"
  //               onClick={() => handleReadMore(notification)}
  //               label="Read More"
  //             >abc </button> */}
  //           </>
  //         ) : notification.description}
  //       </div>
  //     )
  //   };
  // }

  const handleView = (company) => {
    // e.g. navigate to details page or open a modal
    console.log("View", company);
  };

  const handleEdit = (company) => {
    // e.g. open edit modal / navigate to edit page
    console.log("Edit", company);
  };

  const handleDelete = async (company) => {
    const confirmed = await SweetAlert.confirm({
      title: "Delete Company",
      text: "Are you sure you want to delete this company?",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (confirmed) {
      const res = await SuperAdminCompanyServices.superAdminDeleteCompanyById(
        company.id
      );
      if (res?.status === 200) {
        toast.success("Company deleted successfully");
        getCompanyData();
      } else {
        toast.error("Error deleting company");
      }
    }
  };


  const companyTableData = {
    columns: [
      { title: "#", key: "id" },
      { title: "Company Name", key: "name", sorting: true },
      { title: "Email", key: "email", sorting: true },
      { title: "Phone Number", key: "phoneNumber", sorting: true },
      { title: "Postal Code", key: "postalCode", sorting: true },
      { title: "Status", key: "status", sorting: true },
      { title: "Action", key: "action", extraClass: "text-center" },
    ],
    rows: companies?.map((company) => ({
      ...company,
      status: (
        <Badge extraClass={`dt-badge dt-badge-${company.status}`} label={company.status} />
      ),
      action: (
        <ul className="nk-tb-actions gx-1 d-flex flex-row justify-content-center align-items-center list-unstyled gap-2 mb-0 w-100">
          <li>
            <button type="button" className="btn btn-icon btn-trigger" title="View Details" onClick={() => handleView(company)}>
              <em className="bi bi-eye" style={{ color: "#364a63" }} />
            </button>
          </li>
          <li>
            <button type="button" className="btn btn-icon btn-trigger" title="Edit" onClick={() => handleEdit(company)}>
              <em className="bi bi-pencil" style={{ color: "#364a63" }} />
            </button>
          </li>
          <li>
            <button type="button" className="btn btn-icon btn-trigger" title="Delete" onClick={() => handleDelete(company)}>
              <em className="bi bi-trash" style={{ color: "#e85347" }} />
            </button>
          </li>
        </ul>
      ),
    })),
  };

  // Debounce search so you're not firing an API call on every keystroke
  const debouncedSearch = useDebouncedValue(searchQuery, 400);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchCompanies({
      page: pagination.page,
      limit: pagination.limit,
      search: debouncedSearch,
      sortKey: sortConfig.key,
      sortOrder: sortConfig.order,
      filters: colFilters,
    })
      .then((res) => {
        if (cancelled) return;
        setCompanies(res?.data?.result.companies);
        setPagination((prev) => ({ ...prev, totalItems: res?.data?.result.pagination.totalItems }));
      })
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [pagination.page, pagination.limit, debouncedSearch, sortConfig, colFilters]);
  return (
    <>
      <AdminCompanyDashboard />
      <div className="container-fluid px-4 pb-4">
        <div className="mt-4">
          <DataTable
            options={companyTableData}
            title="Company Records"
            searchPlaceholder="Search companies..."
            loading={loading}
            searchQuery={searchQuery}
            onSearchChange={(val) => {
              setSearchQuery(val);
              setPagination((p) => ({ ...p, page: 1 }));
            }}
            sortConfig={sortConfig}
            onSortChange={(cfg) => {
              setSortConfig(cfg);
              setPagination((p) => ({ ...p, page: 1 }));
            }}
            colFilters={colFilters}
            onColFilterChange={(key, val) => {
              setColFilters((prev) => ({ ...prev, [key]: val }));
              setPagination((p) => ({ ...p, page: 1 }));
            }}
            currentPage={pagination.page}
            rowsPerPage={pagination.limit}
            totalItems={pagination.totalItems}
            onPageChange={(p) => setPagination((prev) => ({ ...prev, page: p }))}
            onRowsPerPageChange={(limit) => setPagination({ page: 1, limit, totalItems: pagination.totalItems })}
          />
        </div>
      </div>
    </>
  );
}
export default SuperAdminCompanyDashboard;
