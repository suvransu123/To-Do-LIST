import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "./Add-appointment.css";

export default function AddAppointment() {
  const { id } = useParams(); // get appointment id from URL
  const [cookies] = useCookies(["usergmail"]);
  const navigate = useNavigate();

  const doctors = [
    { name: "Dr. Rajesh Kumar (Cardiologist)", fee: 800 },
    { name: "Dr. Ananya Sharma (Dermatologist)", fee: 600 },
    { name: "Dr. Vikram Singh (Orthopedic)", fee: 700 },
    { name: "Dr. Neha Verma (Pediatrician)", fee: 500 },
    { name: "Dr. Arjun Patel (Neurologist)", fee: 1000 },
  ];

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      doctor: "",
      amount: "",
      gmail: cookies["usergmail"],
    },

    onSubmit: async (values) => {
      const formattedDate = moment(values.date).format("dddd DD MMM YYYY");
      const finalData = { ...values, date: formattedDate };

      try {
        if (id) {
          await axios.put(`http://localhost:3000/appointments/${id}`, finalData);
          alert("Appointment Updated Successfully!");
        } else {
          await axios.post("http://localhost:3000/appointments", finalData);
          alert("Appointment Added Successfully!");
        }
        navigate("/TodoDashboard", { state: { reload: true } });
      } catch (err) {
        console.error(err);
        alert("Something went wrong!");
      }
    },
  });

  // ---------------- LOAD DATA FOR EDIT ---------------- //
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/appointments/${id}`).then((res) => {
        const storedDate = res.data.date;
        const correctDate = moment(
          storedDate,
          ["dddd DD MMM YYYY", "YYYY-MM-DD"]
        ).format("YYYY-MM-DD");

        formik.setValues({
          title: res.data.title,
          description: res.data.description,
          date: correctDate,
          doctor: res.data.doctor,
          amount: res.data.amount,
          gmail: res.data.gmail,
        });
      });
    }
  }, [id]);

  // ---------------- HANDLE DOCTOR CHANGE ---------------- //
  const handleDoctorChange = (e) => {
    const selectedDoctor = e.target.value;
    formik.setFieldValue("doctor", selectedDoctor);

    const doctorObj = doctors.find((d) => d.name === selectedDoctor);
    if (doctorObj) {
      formik.setFieldValue("amount", doctorObj.fee);
    }
  };

  return (
    <div className="add-container">
      <h2 className="add-title">{id ? "Edit Appointment" : "Add New Appointment"}</h2>

      <form onSubmit={formik.handleSubmit} className="add-form">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          rows="2"
          value={formik.values.description}
          onChange={formik.handleChange}
          required
        ></textarea>

        <label>Select Doctor</label>
        <select
          name="doctor"
          value={formik.values.doctor}
          onChange={handleDoctorChange}
          required
        >
          <option value="">-- Select Doctor --</option>
          {doctors.map((doc, index) => (
            <option key={index} value={doc.name}>
              {doc.name}
            </option>
          ))}
        </select>

        {formik.values.doctor && (
          <p className="selected-doctor">
            Selected Doctor: <strong>{formik.values.doctor}</strong>
          </p>
        )}

        <label>Consultation Fee (₹)</label>
        <input
          type="number"
          name="amount"
          value={formik.values.amount}
          disabled
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          required
        />

        <div className="d-flex">
          <button type="submit" className="add-btn">
            {id ? "Update Appointment" : "Add Appointment"}
          </button>

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
