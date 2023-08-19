import { useState } from "react";
import { dbService } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function Home() {
    const [tweet, setTweet] = useState("");

    async function handleSubmit(event: any) {
        event.preventDefault();

        await addDoc(collection(dbService, "tweets"), {
            tweet: tweet,
            createAt: serverTimestamp(),
        });
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
