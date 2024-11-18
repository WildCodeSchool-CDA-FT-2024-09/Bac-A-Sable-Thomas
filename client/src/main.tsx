import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";

import "./index.css";
import App from "./App.tsx";
import ReposPage from "./pages/ReposPage.tsx";
import RepoDetailsPage from "./pages/RepoDetailsPage.tsx";

import { ApolloProvider } from "@apollo/client";
import client from "./services/connection.ts";
import SignupPage from "./pages/SignupPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

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
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
);
