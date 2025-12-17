import React, { useEffect, useState } from "react";
import TodoHeader from "./TodoHeader";
import "./TodoDashboard.css";
import { useCookies } from "react-cookie";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import moment from "moment";

const TodoDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["username", "usergmail"]);
  const [appointments, setAppointment] = useState([]);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);
  const [viewData, setViewData] = useState(null); // store selected appointment
const [showViewModal, setShowViewModal] = useState(false);

  // ---------------- LOAD DASHBOARD DATA ---------------- //
  async function onloadDashboard() {
    let appdata = await axios.get("http://localhost:3000/appointments");
    let objAppoint = appdata.data.filter(
      (item) => item.gmail === cookies.usergmail
    );

    setAllAppointments(objAppoint); // full list
    setAppointment(objAppoint);     // visible list
  }

  // ---------------- AUTH CHECK ---------------- //
  useEffect(() => {
    if (!cookies.username) {
      navigate("/TodoLogin");
    }
  }, [cookies.username, navigate]);

  // ---------------- INITIAL LOAD ---------------- //
  useEffect(() => {
    onloadDashboard();
  }, [cookies.usergmail]);

  // ---------------- RELOAD AFTER ADD/EDIT ---------------- //
  useEffect(() => {
    if (location.state?.reload) {
      // Reload appointments when coming back from Add/Edit page
      onloadDashboard();
      // Do NOT clear location.state or navigate again
      // This prevents UI from flashing empty or hiding appointments
    }
  }, [location.state]);

  // ---------------- LOGOUT ---------------- //
  function handleLogout() {
    removeCookie("username");
    removeCookie("usergmail");
    navigate("/TodoLogin");
  }

  // ---------------- DELETE APPOINTMENT ---------------- //
  async function handleDeleteClick(id) {
    const userapprove = confirm("Are you sure to delete the appointment?");
    if (userapprove) {
      await axios.delete(`http://localhost:3000/appointments/${id}`);
      onloadDashboard(); // refresh list
    }
  }

  // ---------------- SEARCH ---------------- //
  function handleSearchClick(value) {
    if (value.trim() === "") {
      setAppointment(allAppointments); // reset list
      return;
    }

    let filtered = allAppointments.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
     ||   item.date.toLowerCase().includes(value.toLowerCase()));

    setAppointment(filtered);
  }
function handleViewClick(item) {
  setViewData(item);
  setShowViewModal(true);
}

  return (
    <div className="dashboard-container">

      {/* ---------------- LEFT SIDEBAR ---------------- */}
      <div className="sidebar p-3">
        <div className="sidebar-header">
          <TodoHeader />
        </div>
        <ul className="sidebar-menu">
          <li className="active"><i className="bi bi-speedometer2 me-2"></i>Dashboard</li>
          <li><i className="bi bi-inbox me-2"></i>Inbox</li>
          <li><i className="bi bi-briefcase-fill me-2"></i>Work</li>
          <li><i className="bi bi-person-lines-fill me-2"></i>Personal</li>
        </ul>
      </div>

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <div className="content-area flex-grow-1 px-4">
        <div className="d-flex justify-content-between align-items-center mt-3">

          <input
            type="text"
            placeholder="Search appointments..."
            className="search-box"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearchClick(e.target.value);
            }}
          />

          <div>
            <Link to="Add-appointment" className="appointment-form">
              <span className="text-left">Add Appointment</span>
              <span className="plus-icon">+</span>
            </Link>
          </div>

          <div
            className="profile-btn d-flex align-items-center"
            role="button"
            onClick={() => setShowProfile(true)}
          >
            <img src="/image/profile-logo.png" width={60} height={60} />
          </div>
        </div>

        <div className="dashboard-content-row">

          <div className="left-appointments">
            <h4 className="box-title">Appointments</h4>

            {appointments?.map((item, key) => (
              <div className="appoint-item" key={key}>
                <div className="d-flex justify-content-between">

                  <div className="left-side-result-box">
                    <div><span className="result-title">{item?.title}</span></div>
                    <div className="appointment-description">
                      <p>{item?.description}</p>
                    </div>
                  </div>

                  <div className="right-side-result-box">
                    <div>
                      <p>
                        {item?.date
                          ? moment(item.date).format("dddd DD MMM YYYY")
                          : "No date available"}
                      </p>
                    </div>

                    <div className="d-flex justify-content-end pe-3">
                      <span
                        className="bi bi-trash-fill d-block"
                        role="button"
                        onClick={() => handleDeleteClick(item?.id)}
                      ></span>

                      <Link to={`Edit/${item.id}`}>
                        <span
                          className="bi bi-pen-fill d-block ps-4"
                          role="button"
                        ></span>
                      </Link>
                      <span className="bi bi-eye-fill d-block ps-4" role="button"
                       onClick={() => handleViewClick(item)}></span>

                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="right-form">
            <Outlet />
          </div>

        </div>

        <Offcanvas
          show={showProfile}
          onHide={() => setShowProfile(false)}
          placement="end"
          className="offcanvas-custom"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Profile</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <div className="text-center mb-4">
              <img src="/image/profile-logo.png" width={60} height={60} />
              <h5 className="mt-2 profile-name">{cookies.username}</h5>
            </div>

            <ul className="list-group">
              <li className="list-group-item" role="button">
                <i className="bi bi-moon-stars me-2"></i> Night Mode
              </li>
              <li className="list-group-item" role="button">
                <i className="bi bi-gear me-2"></i> Settings
              </li>
              <li
                className="list-group-item text-danger"
                role="button"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
{viewData && (
  <div
    className={`modal fade ${showViewModal ? "show d-block" : ""}`}
    tabIndex="-1"
    
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content p-3">

        <div className="modal-header">
          <h5 className="modal-title">Appointment Details</h5>
          <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
        </div>

        <div className="modal-body">
          <p><strong>Title:</strong> {viewData.title}</p>
          <p><strong>Description:</strong> {viewData.description}</p>
          <p><strong>Date:</strong> {moment(viewData.date).format("dddd DD MMM YYYY")}</p>
          <p><strong>User Gmail:</strong> {viewData.gmail}</p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowViewModal(false)}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default TodoDashboard;
