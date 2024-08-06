import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./Pages/mainpage";
import Layout from "./Components/layout";
import CompanyFlow from "./Pages/companyFlow";
import Reports from "./Pages/reportspage";

import "./index.css";
import { GlobalStateProvider } from "./Components/GlobalState";
[];

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    //The new pages are added here:
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "/",
        element: <MainPage />,
      },

      {
        path: "/companyflow",
        element: <CompanyFlow />,
      },
      {
        path: "/rapport",
        element: <Reports />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStateProvider>
      {/* <DataProvider> */}
      <RouterProvider router={router} />
      {/* </DataProvider> */}
    </GlobalStateProvider>
  </React.StrictMode>
);
