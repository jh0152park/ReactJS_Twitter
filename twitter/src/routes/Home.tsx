import { useEffect, useState } from "react";
import { dbService } from "../firebase";
import {
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import Tweet from "../components/Tweet";

function Home({ userObj }: { userObj: any }) {
    const [tweet, setTweet] = useState("");
    const [allTweets, setAllTweets] = useState<any>([]);

    async function handleSubmit(event: any) {
        event.preventDefault();

        await addDoc(collection(dbService, "tweets"), {
            tweet: tweet,
            createAt: Date.now(),
            creater: userObj.uid,
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
        // getAllTweets();

        const q = query(
            collection(dbService, "tweets"),
            orderBy("createAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const tweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAllTweets(tweetArr);
        });
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
                    <Tweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creater === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
