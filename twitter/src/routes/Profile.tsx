import { useHistory } from "react-router-dom";
import { authService } from "../firebase";

function Profile() {
    const history = useHistory();
    function handleOnLogOut() {
        history.push("/");
        authService.signOut();
    }

    return (
        <>
            <button onClick={handleOnLogOut}>Log Out</button>
        </>
    );
}

export default Profile;
