import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import ReposPage from "./pages/ReposPage.tsx";
import RepoDetailsPage from "./pages/RepoDetailsPage.tsx";

import { ApolloProvider } from "@apollo/client";
import client from "./services/connection.ts";
import SignupPage from "./pages/SignupPage.tsx";

// TODO - custom 404 page

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ReposPage />,
      },
      {
        path: "/details/:repoId",
        element: <RepoDetailsPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
);
