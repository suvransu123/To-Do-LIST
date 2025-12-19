import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  const [cookies, , removeCookie] = useCookies(["username", "usergmail"]);

  const [appointments, setAppointment] = useState([]);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);
  const [viewData, setViewData] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // ✅ Show only 3 by default
  const [showAllAppointments, setShowAllAppointments] = useState(false);

  // ---------------- LOAD DASHBOARD DATA ---------------- //
  const onloadDashboard = useCallback(async () => {
    try {
      const appdata = await axios.get("http://localhost:3000/appointments");
      const objAppoint = appdata.data.filter(
        (item) => item.gmail === cookies.usergmail
      );
      setAllAppointments(objAppoint);
      setAppointment(objAppoint);
    } catch (err) {
      console.error(err);
    }
  }, [cookies.usergmail]);

  // ---------------- AUTH CHECK ---------------- //
  useEffect(() => {
    if (!cookies.username) {
      navigate("/TodoLogin");
    }
  }, [cookies.username, navigate]);

  // ---------------- INITIAL LOAD ---------------- //
  useEffect(() => {
    onloadDashboard();
  }, [onloadDashboard]);

  // ---------------- RELOAD AFTER ADD/EDIT ---------------- //
  useEffect(() => {
    if (location.state?.reload) {
      onloadDashboard();
    }
  }, [location.state, onloadDashboard]);

  // ---------------- LOGOUT ---------------- //
  const handleLogout = useCallback(() => {
    removeCookie("username");
    removeCookie("usergmail");
    navigate("/TodoLogin");
  }, [removeCookie, navigate]);

  // ---------------- DELETE APPOINTMENT ---------------- //
  const handleDeleteClick = useCallback(
    async (id) => {
      if (confirm("Are you sure to delete the appointment?")) {
        await axios.delete(`http://localhost:3000/appointments/${id}`);
        onloadDashboard();
      }
    },
    [onloadDashboard]
  );

  // ---------------- SEARCH ---------------- //
  const handleSearchClick = useCallback(
    (value) => {
      if (value.trim() === "") {
        setAppointment(allAppointments);
        return;
      }

      const filtered = allAppointments.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.date.toLowerCase().includes(value.toLowerCase()) ||
          item.doctor?.toLowerCase().includes(value.toLowerCase())
      );
      setAppointment(filtered);
    },
    [allAppointments]
  );

  // ---------------- VIEW MODAL ---------------- //
  const handleViewClick = useCallback((item) => {
    setViewData(item);
    setShowViewModal(true);
  }, []);

  // ---------------- MEMOIZED APPOINTMENTS LIST ---------------- //
  const appointmentList = useMemo(() => {
    const displayedAppointments = showAllAppointments
      ? appointments
      : appointments.slice(0, 4);

    return displayedAppointments.map((item, key) => (
      <div className="appoint-item" key={key}>
        <div className="d-flex justify-content-between">
          <div className="left-side-result-box">
            <span className="result-title">{item?.title}</span>
            <p className="appointment-description">{item?.description}</p>
            <p className="doctor-name">
              <strong>Doctor:</strong> {item?.doctor || "Not Assigned"}
            </p>
          </div>

          <div className="right-side-result-box">
            <p>
              {item?.date
                ? moment(item.date).format("dddd DD MMM YYYY")
                : "No date"}
            </p>

            <div className="d-flex justify-content-end pe-3">
              <span
                className="bi bi-trash-fill"
                role="button"
                onClick={() => handleDeleteClick(item?.id)}
              ></span>

              <Link to={`Edit/${item.id}`}>
                <span className="bi bi-pen-fill ps-4"></span>
              </Link>

              <span
                className="bi bi-eye-fill ps-4"
                role="button"
                onClick={() => handleViewClick(item)}
              ></span>
            </div>
          </div>
        </div>
      </div>
    ));
  }, [appointments, handleDeleteClick, handleViewClick, showAllAppointments]);

  return (
    <div className="dashboard-container">
      {/* ---------------- LEFT SIDEBAR ---------------- */}
      <div className="sidebar p-3">
        <div className="sidebar-header">
          <TodoHeader />
        </div>
        <ul className="sidebar-menu">
          <li className="active">Dashboard</li>
          <li>Inbox</li>
          <li>Work</li>
          <li>Personal</li>
        </ul>
      </div>

      {/* ---------------- MAIN CONTENT ---------------- */}
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

          <Link to="Add-appointment" className="appointment-form">
            <span>Add Appointment</span>
            <span className="plus-icon">+</span>
          </Link>

          <div
            className="profile-btn"
            role="button"
            onClick={() => setShowProfile(true)}
          >
            <img src="/image/profile-logo.png" width={60} height={60} />
          </div>
        </div>

        <div className="dashboard-content-row">
          <div className="left-appointments">
            <h4 className="box-title">Appointments</h4>
            {appointmentList}

            {/* ✅ Show All / Hide Toggle */}
            {appointments.length > 3 && (
              <div className="show-all-toggle mt-2">
                <button
                  className="btn btn-link p-0"
                  onClick={() => setShowAllAppointments(!showAllAppointments)}
                >
                  {showAllAppointments ? "Hide" : "Show All"}
                </button>
              </div>
            )}
          </div>

          <div className="right-form">
            <Outlet />
          </div>
        </div>

        {/* ---------------- PROFILE OFFCANVAS ---------------- */}
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
              <h5>{cookies.username}</h5>
            </div>

            <ul className="list-group">
              <li className="list-group-item" role="button">Night Mode</li>
              <li className="list-group-item" role="button">Settings</li>
              <li
                className="list-group-item text-danger"
                role="button"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>

        {/* ---------------- VIEW MODAL ---------------- */}
        {viewData && (
          <div className={`modal fade ${showViewModal ? "show d-block" : ""}`}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-3">
                <div className="modal-header">
                  <h5 className="modal-title">Appointment Details</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowViewModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <p><strong>Title:</strong> {viewData.title}</p>
                  <p><strong>Description:</strong> {viewData.description}</p>
                  <p><strong>Date:</strong> {moment(viewData.date).format("dddd DD MMM YYYY")}</p>
                  <p><strong>Doctor:</strong> {viewData.doctor || "Not Assigned"}</p>
                  <p><strong>User Gmail:</strong> {viewData.gmail}</p>
                </div>

                <div className="modal-footer">
                  <button
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
