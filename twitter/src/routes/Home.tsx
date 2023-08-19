import { useState } from "react";

function Home() {
    const [tweet, setTweet] = useState("");

    function handleSubmit(event: any) {
        const newPost = tweet;
        event.preventDefault();
        setTweet("");
    }

    function handleChange(event: any) {
        const {
            target: { value },
        } = event;
        setTweet(value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={tweet}
                    type="text"
                    placeholder="what's going on your mind!?"
                    minLength={1}
                    maxLength={128}
                    onChange={handleChange}
                ></input>
                <input type="submit" value="Tweet"></input>
            </form>
        </div>
    );
}

export default Home;
