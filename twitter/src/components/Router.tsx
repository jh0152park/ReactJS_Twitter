import { useState } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";
import { MainContainer } from "../style/RouterStyle";

function Router({ isLoggedIn, userObj }: { isLoggedIn: any; userObj: any }) {
    return (
        <HashRouter>
            <MainContainer>
                {isLoggedIn && <Navigation userObj={userObj} />}
                <Switch>
                    {isLoggedIn ? (
                        <>
                            <Route exact path="/profile">
                                <Profile userObj={userObj} />
                            </Route>
                            <Route exact path="/">
                                <Home userObj={userObj} />
                            </Route>
                        </>
                    ) : (
                        <>
                            <Route exact path="/">
                                <Auth />
                            </Route>
                        </>
                    )}
                </Switch>
            </MainContainer>
        </HashRouter>
    );
}

export default Router;
