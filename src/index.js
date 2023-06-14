import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { router } from "./routes";
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
