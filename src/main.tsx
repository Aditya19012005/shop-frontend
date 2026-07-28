// Yeh storefront app ka entry point hai. Is file mein React tree mount hoti hai aur global providers connect hote hain.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./store";

import "./index.css";

/**
 * Creates the root container and 
 * renders the application inside React's strict mode.
 */
const root = createRoot(document.getElementById("root") as HTMLElement);
/**
 * store import karta hai 
 * poori ap ko redux store ka access deta hai
 * store = store mai 
 * url based navigation enable browserouter
 */
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);