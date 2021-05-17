import { ConnectedRouter } from "connected-react-router";
import { Provider as ReduxProvider } from "react-redux";
import { Switch, Route } from "react-router";
import { Link } from "react-router-dom";

import store from "@store/index";
import history from "@configs/history";

import { Suspense, lazy } from "react";
const TodoPage = lazy(() => import("@features/todos/pages/todo-page"));

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/">
            Vous etes sur l'accueil
            <Link to="/games">Todos</Link>
          </Route>
          <Route path="/games">
            <Suspense fallback="Chargement en cours...">
              <TodoPage />
            </Suspense>
            <Link to="/">Retour à l'accueil</Link>
          </Route>
        </Switch>
        <br />
      </ConnectedRouter>
    </ReduxProvider>
  );
}
