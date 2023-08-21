import { Link } from "react-router-dom";

function Navigation({ userObj }: { userObj: any }) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">{userObj.displayName}'s Profile</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
