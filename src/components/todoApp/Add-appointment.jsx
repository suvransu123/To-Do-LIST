import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Add-appointment.css";
import moment from "moment";


export default function AddAppointment() {

  const [cookies] = useCookies(["usergmail"]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      gmail: cookies["usergmail"],
    },

    onSubmit: (appointment) => {
       // Format date using moment
  const formattedDate = moment(appointment.date).format("dddd DD MMM YYYY");

  const updatedAppointment = {
    ...appointment,
    date: formattedDate
  };
      axios.post("http://localhost:3000/appointments", updatedAppointment).then(() => {
        alert("Appointment Added Successfully!");
          navigate("/TodoDashboard", { state: { reload: true } });
      });
    },
  });

  return (
    <div className="add-container">
      <h2 className="add-title">Add New Appointment</h2>

      <form onSubmit={formik.handleSubmit} className="add-form">

        <label>Title</label>
        <input
          type="text"
          name="title"
          onChange={formik.handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          rows="8"
          onChange={formik.handleChange}
          required
        ></textarea>

        <label>Date</label>
        <input
          type="date"
          name="date"
          onChange={formik.handleChange}
          required
        />

      <div className="d-flex">
  <button type="submit" className="add-btn">Add Appointment</button> 
  <button 
    type="button" 
    className="add-btn cancel-btn"
    onClick={() => navigate("/TodoDashboard")}
  >
    Cancel
  </button>
</div>


      </form>
    </div>
  );
}
