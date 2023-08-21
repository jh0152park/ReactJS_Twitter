import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

export const LOGO_URL =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/1280px-Logo_of_Twitter.svg.png";

export const GOOGLE_LOGO_URL =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png";

export const GITHUB_LOGO_URL =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png?20180806170715";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(<App />);
