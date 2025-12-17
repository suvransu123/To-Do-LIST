import { createRoot } from "react-dom/client";
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { CookiesProvider } from "react-cookie";
import TodoIndex from "./components/todoApp/TodoIndex";

createRoot(document.getElementById("root")).render(
  <CookiesProvider>
   <TodoIndex  />
  </CookiesProvider>
);
