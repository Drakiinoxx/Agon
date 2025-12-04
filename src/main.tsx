import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App";

// page components

import Home from "./pages/Home";

import Champion from "./pages/Champion";
import Classement from "./pages/Classement";
import Epreuves from "./pages/Epreuves";
import Planning from "./pages/Planning";

// router creation

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Champion",
        element: <Champion />,
      },
      {
        path: "/Classement",
        element: <Classement />,
      },
      {
        path: "/Epreuves",
        element: <Epreuves />,
      },
      {
        path: "/Planning",
        element: <Planning />,
      },
    ],
  },
]);

// rendering

const rootElement = document.getElementById("root");

if (rootElement != null) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}
