import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../firebase";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";

function Tweet({ tweetObj, isOwner }: { tweetObj: any; isOwner: boolean }) {
    const [edit, setEdit] = useState(false);
    const [newTweet, setNewTweet] = useState<string>(tweetObj.tweet);

    async function handleDeletePost() {
        const agree = window.confirm(
            "Are you sure you want to delete  this post?"
        );
        const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
        if (agree) {
            await deleteDoc(doc(getFirestore(), "tweets", `${tweetObj.id}`));
            if (tweetObj.attachedFileURL !== "")
                await deleteObject(
                    ref(storageService, tweetObj.attachedFileURL)
                );
        }
    }

    function toggleEdit() {
        setEdit((prev) => !prev);
    }

    function handleEditChange(event: any) {
        const {
            target: { value },
        } = event;
        setNewTweet(value);
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);

        await updateDoc(TweetTextRef, {
            tweet: newTweet,
        });
        setEdit(false);
    }

    return (
        <div>
            {edit ? (
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={handleSubmit}>
                                <input
                                    onChange={handleEditChange}
                                    placeholder="What's new on your mind!?"
                                    type="text"
                                    value={newTweet}
                                    required
                                />
                                <input type="submit" value="Update Tweet" />
                            </form>
                            <button onClick={toggleEdit}>Cancle</button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h4>{tweetObj.tweet}</h4>
                    {tweetObj.attachedFileURL && (
                        <img
                            src={tweetObj.attachedFileURL}
                            width="50px"
                            height="50px"
                        />
                    )}
                    {isOwner && (
                        <>
                            <button onClick={toggleEdit}>Edit</button>
                            <button onClick={handleDeletePost}>Delete</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Tweet;
