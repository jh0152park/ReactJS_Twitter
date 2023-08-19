import { useState } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

function Router({ isLoggedIn }: { isLoggedIn: any }) {
    return (
        <HashRouter>
            {isLoggedIn && <Navigation></Navigation>}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Route exact path="/">
                            <Home />
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
        </HashRouter>
    );
}

export default Router;
