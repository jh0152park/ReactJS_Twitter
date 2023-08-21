import { Link } from "react-router-dom";
import { Button, Header, Logo } from "../style/NavigationStyle";
import { LOGO_URL, USER_LOGO_URL } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navigation({ userObj }: { userObj: any }) {
    return (
        <Header>
            <div>
                <Link to="/">
                    <Button>
                        <div>
                            <Logo src={LOGO_URL} />
                        </div>
                        Home
                    </Button>
                </Link>
            </div>
            <div>
                <Link to="/profile">
                    <Button>
                        <div>
                            <FontAwesomeIcon icon={faUser} size="2x" />
                        </div>
                        {userObj.displayName}'s Profile
                    </Button>
                </Link>
            </div>
        </Header>
    );
}

export default Navigation;
