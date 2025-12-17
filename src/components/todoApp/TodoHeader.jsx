import React from 'react'
import {  useNavigate } from "react-router-dom";
const TodoHeader = () => {
    const navigate=useNavigate();
  function handleIconClick() {
    navigate("/");
  }
  return (
    <div>
      <header>
              <div className="d-flex icons-box py-4" onClick={handleIconClick}>
                <div className="pt-2 ps-1">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="10"
                      y="10"
                      width="180"
                      height="180"
                      rx="20"
                      fill="white"
                      stroke="#4CAF50"
                      strokeWidth="8"
                    />
      
                    <path
                      d="M60 65 L85 95 L140 40"
                      stroke="#4CAF50"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
      
                    <line
                      x1="40"
                      y1="120"
                      x2="120"
                      y2="120"
                      stroke="#4CAF50"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <line
                      x1="40"
                      y1="145"
                      x2="120"
                      y2="145"
                      stroke="#4CAF50"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <line
                      x1="40"
                      y1="170"
                      x2="120"
                      y2="170"
                      stroke="#4CAF50"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
      
                    <circle cx="155" cy="120" r="10" fill="#4CAF50" />
                    <circle cx="155" cy="145" r="10" fill="#4CAF50" />
                    <circle cx="155" cy="170" r="10" fill="#4CAF50" />
                  </svg>
                </div>
                <p className="fs-3  todo-brand ps-2">TO DO LIST</p>
              </div>
            </header>
    </div>
  )
}

export default TodoHeader
