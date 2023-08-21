import { useEffect, useRef, useState } from "react";
import { dbService, storageService } from "../firebase";
import {
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import Tweet from "../components/Tweet";
import { ref, uploadString } from "@firebase/storage";
import { v4 } from "uuid";
import { getDownloadURL } from "firebase/storage";

function Home({ userObj }: { userObj: any }) {
    const fileInput = useRef<any>();
    const [tweet, setTweet] = useState("");
    const [allTweets, setAllTweets] = useState<any>([]);
    const [attachedFile, setAttachedFile] = useState<any>("");

    async function handleSubmit(event: any) {
        event.preventDefault();
        if (tweet.length < 1) return;

        let attachedFileURL = "";

        if (attachedFile !== "") {
            const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(
                fileRef,
                attachedFile,
                "data_url"
            );
            attachedFileURL = await getDownloadURL(response.ref);
        }

        const newPost = {
            tweet: tweet,
            createAt: Date.now(),
            creater: userObj.uid,
            attachedFileURL: attachedFileURL,
        };

        await addDoc(collection(dbService, "tweets"), newPost);
        setTweet("");
        setAttachedFile("");
        fileInput.current.value = null;
    }

    function handleChange(event: any) {
        const {
            target: { value },
        } = event;
        setTweet(value);
    }

    function handleOnFileChange(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            setAttachedFile(reader.result);
        };
        reader.readAsDataURL(file);
    }

    function handleOnClearFile() {
        setAttachedFile("");
        fileInput.current.value = null;
    }

    useEffect(() => {
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
                <input
                    ref={fileInput}
                    type="file"
                    accept="image/*"
                    onChange={handleOnFileChange}
                ></input>
                <input type="submit" value="Tweet"></input>
                {attachedFile && (
                    <div>
                        <img
                            src={attachedFile}
                            width="50px"
                            height="50px"
                        ></img>
                        <button onClick={handleOnClearFile}>Clear</button>
                    </div>
                )}
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
