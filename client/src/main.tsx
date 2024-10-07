import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";

import "./index.css";
import RepoDetailsPage from "./pages/RepoDetailsPage.tsx";
import ReposPage from "./pages/ReposPage.tsx";
import connection from "./services/connection.ts";
import { ReposRequest, Languages } from "./types/RepoTypes.ts";

// TODO - custom 404 page

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ReposPage />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const [reposRes, languagesRes] = await Promise.all([
            connection.get<ReposRequest>(`/api/repos${url.search}`),
            connection.get<Languages>("/api/languages"),
          ]);
          return { repos: reposRes.data, languages: languagesRes.data };
        },
      },
      {
        path: "/details/:id",
        element: <RepoDetailsPage />,
        loader: async ({ params }) => {
          const { data } = await connection.get<ReposRequest>(
            `/api/repos/${params.id}`,
          );
          return data;
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
