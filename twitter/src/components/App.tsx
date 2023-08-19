import React, { useEffect, useState } from "react";
import Router from "./Router";
import { authService } from "../firebase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                // user is logged in
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? (
                <Router isLoggedIn={isLoggedIn}></Router>
            ) : (
                "Initialzing..."
            )}
        </>
    );
}

export default App;
