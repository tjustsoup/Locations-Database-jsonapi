import React from "react";
import { TeamsFxContext } from "./Context";
import KeplerGl from "kepler.gl";
import { Button } from "@mui/material";
import { useData } from "@microsoft/teamsfx-react";

export default function Tab() {
  const { teamsfx } = React.useContext(TeamsFxContext);
  console.log(teamsfx);
  const getRequest = useData(async () => {
    if (teamsfx) {
      const accessToken = await teamsfx.getCredential().getToken([".default"]);
      console.log(accessToken);
    }
  });

  return (
    <div>
      <Button onClick={getRequest.reload}>Hello</Button>
      <KeplerGl
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        id="theMap"
        width={700}
        height={500}
      />
    </div>
  );
}
