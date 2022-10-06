import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
}

function Router({ }: IRouterProps) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/coin-tracker/:coinId">
                    <Coin />
                </Route>
                <Route path="/coin-tracker">
                    <Coins />
                </Route>
            </Switch >
        </BrowserRouter >
    );
}

export default Router