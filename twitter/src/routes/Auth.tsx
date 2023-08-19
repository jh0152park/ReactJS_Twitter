import { useState } from "react";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "@firebase/auth";
import { authService } from "../firebase";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    function handleOnChange(event: any) {
        console.log(event.target.name);
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    async function handleOnSubmit(event: any) {
        event.preventDefault();
        setEmail("");
        setPassword("");

        if (newAccount) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    console.log("created new user account successfully");
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("occurred error when creating new user");
                    console.log(errorMessage);
                    setError(errorMessage);
                });
        } else {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("log in user successfully");
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("occurred error when log in");
                    console.log(errorMessage);
                    setError(errorMessage);
                });
        }
    }

    function toggleAccount() {
        setNewAccount((prev) => !prev);
    }

    async function handleOnSocialClick(event: any) {
        const {
            target: { name },
        } = event;

        let data;
        let provider: any;

        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }

        data = await signInWithPopup(authService, provider);
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={handleOnChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={handleOnChange}
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Sign In"}
                />
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={handleOnSocialClick} name="google">
                    Continue with Google
                </button>
                <button onClick={handleOnSocialClick} name="github">
                    Continue with Github
                </button>
            </div>
            <div>{error}</div>
        </div>
    );
}

export default Auth;
