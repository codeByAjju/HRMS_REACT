function AdminCompanyDashboard() {
  return (<main className="dashboard-content">
    <div className="container-fluid px-3 px-lg-4 py-4">
      {/* Page Heading */}
      <div className="page-heading">
        <div className="page-heading-copy">
          <span className="page-icon">
            <i className="bi bi-speedometer2" aria-hidden="true"></i>
          </span>
          <div>
            <p className="eyebrow mb-1">Overview</p>
            <h1 className="h3 mb-1">Dashboard</h1>
            <p className="text-muted mb-0">
              Monitor performance, sales, users, and support from one clean
              workspace.
            </p>
          </div>
        </div>
        <div className="heading-actions">
          <button className="btn btn-outline-secondary btn-sm" type="button">
            <i className="bi bi-download" aria-hidden="true"></i> Export
          </button>
          <button className="btn btn-primary btn-sm" type="button">
            <i className="bi bi-file-earmark-plus" aria-hidden="true"></i>{" "}
            Create Report
          </button>
        </div>
      </div>

      {/* Metric Cards Section */}
      <section className="row g-3 mt-1" aria-label="Dashboard metrics">
        {/* Revenue Card */}
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-primary">
            <div className="metric-top">
              <span className="metric-label">Revenue</span>
              <span className="metric-icon">
                <i className="bi bi-currency-dollar" aria-hidden="true"></i>
              </span>
            </div>
            <div className="metric-value">$48,240</div>
            <div className="metric-meta">
              <span className="text-success">+12.5%</span>
              <span>from last month</span>
            </div>
          </article>
        </div>

        {/* Orders Card */}
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-success">
            <div className="metric-top">
              <span className="metric-label">Orders</span>
              <span className="metric-icon">
                <i className="bi bi-bag-check" aria-hidden="true"></i>
              </span>
            </div>
            <div className="metric-value">1,284</div>
            <div className="metric-meta">
              <span className="text-success">+8.2%</span>
              <span>new orders</span>
            </div>
          </article>
        </div>

        {/* Customers Card */}
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-warning">
            <div className="metric-top">
              <span className="metric-label">Customers</span>
              <span className="metric-icon">
                <i className="bi bi-people" aria-hidden="true"></i>
              </span>
            </div>
            <div className="metric-value">8,742</div>
            <div className="metric-meta">
              <span className="text-success">+5.1%</span>
              <span>active users</span>
            </div>
          </article>
        </div>

        {/* Tickets Card */}
        <div className="col-12 col-sm-6 col-xl-3">
          <article className="metric-card metric-danger">
            <div className="metric-top">
              <span className="metric-label">Tickets</span>
              <span className="metric-icon">
                <i className="bi bi-life-preserver" aria-hidden="true"></i>
              </span>
            </div>
            <div className="metric-value">36</div>
            <div className="metric-meta">
              <span className="text-danger">3 urgent</span>
              <span>need review</span>
            </div>
          </article>
        </div>
      </section>
    </div>
  </main>);
}

export default AdminCompanyDashboard;
