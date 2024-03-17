import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const renderApp = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

if (typeof Telegram !== 'undefined' && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready(() => {
    renderApp();
  });
} else {
  renderApp();
}
