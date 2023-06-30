import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import PdfUpload from "./components/PdfUpload";
import PdfChat from "./components/PdfChat"
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./components/Error";
import HomePage from "./admin/HomePage";
import AdminLogin from "./admin/AdminLogin";
import Welcome from "./admin/Welcome"
import UserManager from "./admin/UserManager";
import TopUpManager from "./admin/TopUpManager";
import ContactManager from "./admin/ContactManager";
import RequestRecord from "./admin/RequestRecord";
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path:"/pdf-upload",
    element:<PdfUpload />
  },
  {
    path:"/pdf-chat",
    element:<PdfChat />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <HomePage />,
    children: [
      {
        path: "/admin",
        element: <Welcome />,
      },
      {
        path: "/admin/user-manager",
        element: <UserManager />,
      },
      {
        path: "/admin/topup-manager",
        element: <TopUpManager />,
      },
      {
        path: "/admin/contact-manager",
        element: <ContactManager />,
      },
      {
        path: "/admin/request-record",
        element: <RequestRecord />,
      },
      
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
