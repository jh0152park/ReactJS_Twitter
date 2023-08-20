import { useEffect, useState } from "react";
import { dbService } from "../firebase";
import {
    addDoc,
    collection,
    getDocs,
    query,
    serverTimestamp,
} from "firebase/firestore";

function Home() {
    const [tweet, setTweet] = useState("");
    const [allTweets, setAllTweets] = useState<any>([]);

    async function handleSubmit(event: any) {
        event.preventDefault();

        await addDoc(collection(dbService, "tweets"), {
            tweet: tweet,
            createAt: Date.now(),
        });
        setTweet("");
    }

    function handleChange(event: any) {
        const {
            target: { value },
        } = event;
        setTweet(value);
    }

    async function getAllTweets() {
        const q = query(collection(dbService, "tweets"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((document) => {
            const tweetObj = {
                ...document.data(),
                id: document.id,
            };
            setAllTweets((prev: any) => [tweetObj, ...prev]);
        });
    }

    useEffect(() => {
        getAllTweets();
    }, []);

    console.log(allTweets);

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
            <div>
                {allTweets.map((tweet: any) => (
                    <div key={tweet.id}>
                        <h4>{tweet.tweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
