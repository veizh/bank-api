import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.css";
import App from "./App";
import {Provider} from "react-redux"
import { store } from "./utils/store";
const root = ReactDOM.createRoot(document.querySelector("body"));
root.render(
    <Provider store={store}>

    <App>
    </App>
    </Provider>
);
