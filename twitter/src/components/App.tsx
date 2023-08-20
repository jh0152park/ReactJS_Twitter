import React, { useEffect, useState } from "react";
import Router from "./Router";
import { authService } from "../firebase";

function App() {
    const [init, setInit] = useState(false);

    const [userObj, setUserObj] = useState<any>(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj(user);
            } else {
                setUserObj(null);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? (
                <Router
                    isLoggedIn={Boolean(userObj)}
                    userObj={userObj}
                ></Router>
            ) : (
                "Initialzing..."
            )}
        </>
    );
}

export default App;
