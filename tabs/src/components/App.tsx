// https://fluentsite.z22.web.core.windows.net/quick-start
import { Provider, teamsTheme, Loader } from "@fluentui/react-northstar";
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import { useData, useTeamsFx } from "@microsoft/teamsfx-react";
import Tab from "./Tab";
import "./App.css";
import TabConfig from "./TabConfig";
import { TeamsFxContext } from "./Context";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store/store";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { theme, themeString, teamsfx } = useTeamsFx();
  const teamsfxLogin = useData(
    async () => {
      if (teamsfx) {
        console.log("Logging in...")
        await teamsfx.login([".default"])
      }
    },
    { autoLoad: true }
  )
  return (
    <TeamsFxContext.Provider value={{ theme, themeString, teamsfx }}>
      <Provider
        theme={theme || teamsTheme}
        styles={{ backgroundColor: "#eeeeee" }}
      >
        <ReduxProvider store={store}>
          <Router>
            <Route exact path="/">
              <Redirect to="/tab" />
            </Route>
            {teamsfxLogin.loading ? (
              <Loader style={{ margin: 100 }} />
            ) : (
              <>
                <Route exact path="/tab" component={Tab} />
                <Route exact path="/config" component={TabConfig} />
              </>
            )}
          </Router>
        </ReduxProvider>
      </Provider>
    </TeamsFxContext.Provider>
  );
}
