import { useState } from "react";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="admin-sidebar" aria-label="Main navigation">
      <div className="sidebar-header">
        <a className="brand-mark" href="#dashboard" aria-label="adminHMD dashboard">
          <span className="brand-icon">
            <i className="bi bi-grid-1x2-fill" aria-hidden="true"></i>
          </span>
          <span className="brand-copy">
            <span className="brand-title">adminHMD</span>
            <span className="brand-subtitle">Admin Template</span>
          </span>
        </a>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          to="/dashboard"
          aria-current="page"
        >
          <span className="nav-icon">
            <i className="bi bi-speedometer2" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Dashboard</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          to="/users"
        >
          <span className="nav-icon">
            <i className="bi bi-people" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Users</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          to="/add-user"
        >
          <span className="nav-icon">
            <i className="bi bi-person-plus" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Add User</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          to="/profile"
        >
          <span className="nav-icon">
            <i className="bi bi-person-badge" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Profile</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          to="/charts"
        >
          <span className="nav-icon">
            <i className="bi bi-bar-chart-line" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Charts</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          to="/tables"
        >
          <span className="nav-icon">
            <i className="bi bi-table" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Tables</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          to="/forms"
        >
          <span className="nav-icon">
            <i className="bi bi-ui-checks-grid" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Forms</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          to="/components"
        >
          <span className="nav-icon">
            <i className="bi bi-grid-3x3-gap" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Components</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          to="/alerts"
        >
          <span className="nav-icon">
            <i className="bi bi-exclamation-triangle" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Alerts</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          to="/modals"
        >
          <span className="nav-icon">
            <i className="bi bi-window-stack" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Modals</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          to="/settings"
        >
          <span className="nav-icon">
            <i className="bi bi-gear" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Settings</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
          to="/blank"
        >
          <span className="nav-icon">
            <i className="bi bi-file-earmark" aria-hidden="true"></i>
          </span>
          <span className="nav-text">Blank Page</span>
        </NavLink>
      </nav>

      <div className="sidebar-user">
        <img
          className="avatar-img avatar-md sidebar-user-avatar"
          src="/assets/images/avatar/avatar.jpg"
          alt="Admin Hasan"
        />
        <strong>Admin Hasan</strong>
        <small>Active Workspace</small>
      </div>

      <div className="sidebar-footer">
        <span className="status-dot"></span>
        <span className="sidebar-footer-text">System running smoothly</span>
      </div>
    </aside>
  );
}

export default AdminSidebar;
