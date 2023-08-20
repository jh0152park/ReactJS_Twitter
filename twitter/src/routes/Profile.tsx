import { useHistory } from "react-router-dom";
import { authService, dbService } from "../firebase";
import { useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

function Profile({ userObj }: { userObj: any }) {
    const history = useHistory();

    function handleOnLogOut() {
        history.push("/");
        authService.signOut();
    }

    async function getMyTweets() {
        const q = query(
            collection(dbService, "tweets"),
            where("creater", "==", userObj.uid),
            orderBy("createAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", JSON.stringify(doc.data()));
        });
    }

    useEffect(() => {
        getMyTweets();
    }, [userObj]);

    return (
        <>
            <button onClick={handleOnLogOut}>Log Out</button>
        </>
    );
}

export default Profile;
