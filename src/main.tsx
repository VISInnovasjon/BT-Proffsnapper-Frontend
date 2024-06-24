import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./Pages/mainpage";
import Layout from "./Components/layout";
import AddCompany from "./Pages/addCompany";
import HentRapport from "./Pages/hentRapport";
import Testpage from "./Pages/testpage";
import "./index.css";
import { GlobalStateProvider } from "./Components/GlobalState";
[];

// import { GlobalStateProvider } from "./Components/GlobalState";
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
        path: "/addcompany",
        element: <AddCompany />,
      },
      {
        path: "/rapport",
        element: <HentRapport />,
      },
      {
        path: "/test",
        element: <Testpage />,
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
