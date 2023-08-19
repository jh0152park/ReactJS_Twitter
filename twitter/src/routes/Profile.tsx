import { authService } from "../firebase";

function Profile() {
    function handleOnLogOut() {
        authService.signOut();
    }

    return (
        <>
            <button onClick={handleOnLogOut}>Log Out</button>
        </>
    );
}

export default Profile;
