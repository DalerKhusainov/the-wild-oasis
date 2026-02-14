import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DarkModeProvider } from "./context/DarkModeContext.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
