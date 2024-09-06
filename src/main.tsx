import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./Pages/mainpage";
import Layout from "./Components/layout";
import CompanyFlow from "./Pages/companyFlow";
import { MsalProvider } from "@azure/msal-react";
import Reports from "./Pages/reportspage";
import { msalConfig } from "./Components/MsalPca";

import "./index.css";
import { GlobalStateProvider } from "./Components/GlobalState";
[];

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { ProtectedRoute } from "./Components/ProtectedRoute";
const pca = new PublicClientApplication(msalConfig);
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
        element: (
          <ProtectedRoute>
            <CompanyFlow />
          </ProtectedRoute>
        ),
      },
      {
        path: "/rapport",
        element: (
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <GlobalStateProvider>
        <RouterProvider router={router} />
      </GlobalStateProvider>
    </MsalProvider>
  </React.StrictMode>
);
