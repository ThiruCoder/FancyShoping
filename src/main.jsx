import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./ReduxPage/ReduxStore.jsx";
import { BrowserRouter } from "react-router-dom";
import Context from "./Context/Context.jsx";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Context>
            <App />
          </Context>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
