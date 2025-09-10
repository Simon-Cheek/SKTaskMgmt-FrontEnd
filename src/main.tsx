import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { GlobalProvider, useGlobal } from "./state/GlobalContext";

export const router = createRouter({
  routeTree,
});

function App() {
  const global = useGlobal();
  return <RouterProvider router={router} context={{ global }} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);
