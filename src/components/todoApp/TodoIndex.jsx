import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import TodoHome from "./TodoHome";
import TodoRegister from "./TodoRegister";
import TodoLogin from "./TodoLogin";
import TodoDashboard from "./TodoDashboard";
import AddAppointment from "./Add-appointment";
import TodoEdit from "./TodoEdit";


const TodoIndex = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoHome />} />
        <Route path="/TodoRegister" element={<TodoRegister />} />
        <Route path="/TodoLogin" element={<TodoLogin />} />
        <Route path="/TodoDashboard" element={<TodoDashboard />}>
        <Route path="Add-appointment" element={<AddAppointment />}/>
         <Route path="Edit/:id" element={<TodoEdit />}/>
       
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default TodoIndex;
