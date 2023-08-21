import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../firebase";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import {
    DeleteButton,
    EditButton,
    TweetContainer,
    Text,
    Image,
} from "../style/TweetStyle";

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

    console.log(tweetObj.attachedFileURL.length);
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
                    <TweetContainer
                        isAttached={tweetObj.attachedFileURL.length > 1}
                    >
                        <Text>{tweetObj.tweet}</Text>
                        {tweetObj.attachedFileURL && (
                            <Image
                                src={tweetObj.attachedFileURL}
                                width="150px"
                                height="150px"
                            />
                        )}
                        {isOwner && (
                            <>
                                <EditButton onClick={toggleEdit}>✏️</EditButton>
                                <DeleteButton onClick={handleDeletePost}>
                                    🗑️
                                </DeleteButton>
                            </>
                        )}
                    </TweetContainer>
                </>
            )}
        </div>
    );
}

export default Tweet;
