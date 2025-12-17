import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "./Add-appointment.css";

export default function AppointmentForm() {
  const { id } = useParams();
  const [cookies] = useCookies(["usergmail"]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      gmail: cookies["usergmail"],
    },

    onSubmit: async (values) => {
      // Convert date → "Wednesday 24 Dec 2025"
      const formattedDate = moment(values.date, "YYYY-MM-DD").format(
        "dddd DD MMM YYYY"
      );

      const finalData = {
        ...values,
        date: formattedDate,
      };

      if (id) {
        await axios.put(`http://localhost:3000/appointments/${id}`, finalData);
        alert("Appointment Updated Successfully!");
      } else {
        await axios.post("http://localhost:3000/appointments", finalData);
        alert("Appointment Added Successfully!");
      }

      navigate("/TodoDashboard", { state: { reload: true } });
    },
  });

  // Load data in EDIT MODE
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/appointments/${id}`).then((res) => {
        const storedDate = res.data.date;

        // Convert stored date to normal input format
        const correctDate = moment(
          storedDate,
          ["dddd DD MMM YYYY", "YYYY-MM-DD"]
        ).format("YYYY-MM-DD");

        formik.setValues({
          title: res.data.title,
          description: res.data.description,
          date: correctDate,
          gmail: res.data.gmail,
        });
      });
    }
  }, [id]);

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
          rows="8"
          value={formik.values.description}
          onChange={formik.handleChange}
          required
        ></textarea>

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
            {id ? "Update" : "Add Appointment"}
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
