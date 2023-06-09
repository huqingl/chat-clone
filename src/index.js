import React from "react";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./components/Error";
import HomePage from "./admin/HomePage";
import Welcome from "./admin/Welcome"
import UserManager from "./admin/UserManager";
import TopUpManager from "./admin/TopUpManager";
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
