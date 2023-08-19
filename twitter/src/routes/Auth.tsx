import { useState } from "react";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    function handleOnSubmit(event: any) {
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={handleOnChange}
                />
                <input
                    name="password"
                    type="text"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={handleOnChange}
                />
                <input type="submit" value="Log In" />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
}

export default Auth;
