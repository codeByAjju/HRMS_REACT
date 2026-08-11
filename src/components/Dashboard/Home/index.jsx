import "./userDashboard.css";
function UserDashboard() {
  return (
    <>
      <div className="row">
        <div className="col-lg-12 d-flex">
          <div className="col-lg-6">
            <span className="h5">Dashboard</span>
            <span className="mx-2">Home</span>
            <span>Dashboard</span>
          </div>
          <div className="col-lg-6 d-flex justify-content-end">
            <span className="mx-2">
              <i className="fa fa-search" aria-hidden="true"></i>
            </span>
            <span className="mx-2">
              <i className="fa fa-sticky-note-o" aria-hidden="true"></i>
            </span>
            <span className="mx-2">
              <i className="fa fa-bell" aria-hidden="true"></i>
            </span>
            <span className="mx-2">
              <i className="fa fa-power-off" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div className="col-lg-12 d-flex mt-4 bg-light">
          <div className="col-lg-4">
            <span className="h5">Welcome Ajay Patel</span>
          </div>
          <div className="col-lg-6 d-flex justify-content-end">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <div>Check In At - 10:06</div>
              <span>Time Since Check-In: 8 hrs 17</span>
            </div>
          </div>

          <div className="col-lg-2 d-flex justify-content-end">
            <button className="btn btn-danger">Check Out</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 d-flex mt-3">
          <div className="col-lg-3 d-flex box-shadow p-3">
            <div className="col-10">
              <i className="fa fa-user-circle" style={{ fontSize: "60px" }}></i>
              <div className="mt-3">
                <span className="font-size">Ajay Patel</span>{" "}
                <span>CST0611</span>
              </div>
              <div className="">Associate Software Engineer</div>
            </div>

            <div className="col-2">
              <i className="fa fa-edit right"></i>
            </div>
          </div>
          <div className="col box-shadow">
            <div className="row h-50">
              <div className="text-center col-lg-6">
                <div style={{ textAlign: "justify" }}>
                  <span>Present</span>
                  <br />
                  <span className="mt-3">19</span>
                </div>
              </div>
              <div className="col-lg-6 text-center">
                <i className="fa fa-briefcase" aria-hidden="true"></i>
              </div>
            </div>
            <div className="row h-50">
              <div className="text-center col-lg-6">
                <div style={{ textAlign: "justify" }}>
                  <span>Logs</span>
                  <br />
                  <span className="mt-3">146:15</span>
                </div>
              </div>
              <div className="col-lg-6 text-center">
                <i className="fa fa-copy"></i>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row h-50">
              <div className="text-center col-lg-6">
                <div style={{ textAlign: "justify" }}>
                  <span>Absent</span>
                  <br />
                  <span className="mt-3">1</span>
                </div>
              </div>
              <div className="col-lg-6 text-center">
                <i className="fa fa-briefcase" aria-hidden="true"></i>
              </div>
            </div>
            <div className="row h-50 ">
              <div className="text-center col-lg-6">
                <div style={{ textAlign: "justify" }}>
                  <span>Projects</span>
                  <br />
                  <span className="mt-3">1</span>
                </div>
              </div>
              <div className="col-lg-6 text-center">
                <i className="fa fa-copy"></i>
              </div>
            </div>
          </div>
          <div className="col box-shadow">
            <div className="row h-50">
              <div className="text-center col-lg-6">
                <div style={{ textAlign: "justify" }}>
                  <span>Leaves</span>
                  <br />
                  <span className="mt-3">0</span>
                </div>
              </div>
              <div className="col-lg-6 text-center">
                <i className="fa fa-briefcase" aria-hidden="true"></i>
              </div>
            </div>
            <div className="row h-50 ">
              <div className="text-center col-lg-6">
                <div style={{ textAlign: "justify" }}>
                  <span>Tasks</span>
                  <br />
                  <span className="mt-3">0</span>
                </div>
              </div>
              <div className="col-lg-6 text-center">
                <i className="fa fa-copy"></i>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="row h-50">
              <div className="text-center col-lg-6">
                <div style={{ textAlign: "justify" }}>
                  <span>Late(s)</span>
                  <br />
                  <span className="mt-3">0</span>
                </div>
              </div>
              <div className="col-lg-6 text-center">
                <i className="fa fa-clock-o clock-warning" aria-hidden="true"></i>
              </div>
            </div>
            <div className="row h-50 ">
              <div className="text-center col-lg-6">
                <div style={{ textAlign: "justify" }}>
                  <span>Overdue</span>
                  <br />
                  <span className="mt-3">0</span>
                </div>
              </div>
              <div className="col-lg-6 text-center">
                <i className="fa fa-clock-o" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div className="col-lg-3 d-flex box-shadow p-3">
            <div className="col-8">
              {/* <i className="fa fa-user-circle" style={{ fontSize: "25px" }}></i> */}
              <span className="font-size">
                HAPPY 3<sup>rd</sup> WORK
              </span>
              <div className="mt-3">
                <h4
                  className=""
                  style={{ color: "#e4a11b", fontFamily: "cursive" }}
                >
                  anniversary
                </h4>
              </div>
              <div className="">
                <i
                  className="fa fa-user-circle"
                  style={{ fontSize: "20px" }}
                ></i>
                <span className="mx-1">Associate Software Engineer</span>
              </div>
            </div>

            <div className="col-2">
              <div className="col-4">
                <img
                  src="./balloons.png"
                  // src="https://as2.ftcdn.net/v2/jpg/06/77/06/63/1000_F_677066322_V3a0KoN3cNnUzaLPpvXV7MVsmnHwbG4e.webp"
                  alt="BigCo Inc. logo"
                  // style={{ height: "150px", width: "90px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
