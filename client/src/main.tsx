import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";

import "./index.css";
import RepoDetailsPage from "./pages/RepoDetailsPage.tsx";
import ReposPage from "./pages/ReposPage.tsx";
import connection from "./services/connection.ts";
import { RepoRequest } from "./types/RepoTypes.ts";

// TODO - custom 404 page

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ReposPage />,
        loader: async () => {
          const { data } = await connection.get<RepoRequest>("/api/repos");
          return data;
        },
      },
      {
        path: "/details/:id",
        element: <RepoDetailsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
