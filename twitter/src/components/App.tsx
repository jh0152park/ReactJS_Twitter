import React, { useEffect, useState } from "react";
import Router from "./Router";
import { authService } from "../firebase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState<any>(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? (
                <Router isLoggedIn={isLoggedIn} userObj={userObj}></Router>
            ) : (
                "Initialzing..."
            )}
        </>
    );
}

export default App;
