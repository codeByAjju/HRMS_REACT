import AdminSidebar from "../../components/SuperAdmin/Dashboard/AdminSidebar";
import Navbar from "../../components/SuperAdmin/Dashboard/Navbar";

function AdminDashboardLayout({ children }) {
  return (
    <div className="admin-shell">
      <div className="sidebar-backdrop" data-sidebar-close></div>
      
      <AdminSidebar />
      
      <div className="admin-main">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default AdminDashboardLayout;