// import  { useState } from "react";
// import './AppointmentPanel.css'
// import AddAppointment from "./Add-appointment";
// export default function AppointmentPanel() {
//   const [view, setView] = useState("info"); // info | add | edit

//   const userName = "Suvrasnu";

//   return (
//     <div className="panel-container">

//       {/* ================= DEFAULT INFO CARD ================= */}
//       {view === "info" && (
//         <div className="info-card">

//           <h2>Welcome {userName} 👋</h2>

//           <p className="info-text">
//             This is your personal medical appointment manager.  
//             Follow the steps below to use the app easily.
//           </p>

//           <hr />

//           <h4>📌 How to Add an Appointment</h4>
//           <p>
//             Click on the <b>“Add Appointment”</b> button below.  
//             Fill in appointment title, description, select a doctor, choose a date  
//             and click <b>Add Appointment</b>.  
//             Your appointment will be saved automatically.
//           </p>

//           <h4>✏️ How to Edit an Appointment</h4>
//           <p>
//             In the appointment list, find the appointment you want to change  
//             and click the <b>Edit (✏️)</b> icon.  
//             Update the details and save.
//           </p>

//           <h4>🗑 How to Delete an Appointment</h4>
//           <p>
//             Example: If you added an appointment for <b>Bikash</b>  
//             and no longer need it, go to that appointment and click the  
//             <b>Delete (🗑)</b> icon.  
//             Confirm the action and the appointment will be removed.
//           </p>

//           <h4>🔍 How to Search Appointments</h4>
//           <p>
//             Use the search box to find appointments by title, doctor name,  
//             or date. Results will appear instantly.
//           </p>

//           <div className="text-center mt-4">
//             <button
//               className="add-btn"
//               onClick={() => setView("add")}
//             >
//               ➕ Add Appointment
//             </button>
//           </div>

//         </div>
//       )}

//       {/* ================= ADD APPOINTMENT FORM ================= */}
//       {view === "add" && (
//         <AddAppointment
//           onCancel={() => setView("info")}
//           onSuccess={() => setView("info")}
//         />
//       )}

//       {/* ================= EDIT APPOINTMENT (FUTURE) ================= */}
//       {view === "edit" && (
//         <AddAppointment
//           isEdit={true}
//           onCancel={() => setView("info")}
//           onSuccess={() => setView("info")}
//         />
//       )}

//     </div>
//   );
// }
