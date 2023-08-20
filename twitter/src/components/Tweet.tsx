import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import { useState } from "react";

function Tweet({ tweetObj, isOwner }: { tweetObj: any; isOwner: boolean }) {
    const [edit, setEdit] = useState(false);
    const [newTweet, setNewTweet] = useState<string>(tweetObj.tweet);

    async function handleDeletePost() {
        const agree = window.confirm(
            "Are you sure you want to delete  this post?"
        );
        const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
        if (agree) {
            await deleteDoc(TweetTextRef);
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
            ) : (
                <>
                    <h4>{tweetObj.tweet}</h4>
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
