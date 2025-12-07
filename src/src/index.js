import React from "react";
// Import createRoot from the client entry point
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 1. Find the container element.
// It's more standard to use document.getElementById('root')
// instead of document.querySelector('body') for the root.
// We'll use document.getElementById('root') for best practice,
// but ensure your public/index.html has a matching element.
const container = document.getElementById("root");

// If the container is not found, you can add an error check:
if (!container) throw new Error("Failed to find the root element!");

// 2. Create a root.
const root = createRoot(container);

// 3. Render the application using the new root API.
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
