import { useEffect, useRef, useState } from "react";
import { dbService, storageService } from "../firebase";
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import Tweet from "../components/Tweet";
import { ref, uploadString } from "@firebase/storage";
import { v4 } from "uuid";
import { getDownloadURL } from "firebase/storage";
import {
    AttachedBox,
    AttachedInput,
    Container,
    Form,
    Frame,
    FrameButton,
    Frames,
    Input,
    SubmitButton,
} from "../style/HomeStyle";

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
        if (event.target.files.length <= 0) fileInput.current.value = "";

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

    function handleOnFileAttachedBoxClick() {
        fileInput.current.click();
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
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input
                    value={tweet}
                    type="text"
                    placeholder="What's going on your mind!?"
                    minLength={1}
                    maxLength={128}
                    onChange={handleChange}
                ></Input>
                <AttachedBox onClick={handleOnFileAttachedBoxClick}>
                    Add Photos <span>+</span>
                </AttachedBox>
                <AttachedInput
                    ref={fileInput}
                    type="file"
                    accept="image/*"
                    onChange={handleOnFileChange}
                ></AttachedInput>
                <SubmitButton type="submit" value="➔"></SubmitButton>
                {attachedFile && (
                    <Frames>
                        <Frame
                            src={attachedFile}
                            width="50px"
                            height="50px"
                        ></Frame>
                        <FrameButton onClick={handleOnClearFile}>
                            Clear
                        </FrameButton>
                    </Frames>
                )}
            </Form>
            <div>
                {allTweets.map((tweet: any) => (
                    <Tweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creater === userObj.uid}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Home;
