import React, { useState } from "react";
import Router from "./Router";
import { authService } from "../firebase";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

    return <Router isLoggedIn={isLoggedIn}></Router>;
}

export default App;
