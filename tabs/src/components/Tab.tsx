import React from "react";
import { TeamsFxContext } from "./Context";
import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import { DataGrid, GridColumns, GridRowModel, GridSelectionModel } from "@mui/x-data-grid";
import columns from "./columns";
import { useClient } from "jsonapi-react";
import { useData } from "@microsoft/teamsfx-react";

export default function Tab() {
  const { teamsfx } = React.useContext(TeamsFxContext);

  // States
  const [rowData, setRowData] = React.useState<GridRowModel[]>([]);
  const [dgPage, setDgPage] = React.useState(0);
  const [dgPageSize, setDgPageSize] = React.useState(5);
  const [rowCount, setRowCount] = React.useState(0)
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [columnData, setColumnData] = React.useState<GridColumns>([])
  React.useEffect(() => {
    if (rowData.length > 0) {
      setColumnData(columns(rowData))
    }
  }, [rowData])
  
  // API
  const client = useClient();
  // Read Request
  const READ = useData( async () => {
    const accessToken = await teamsfx?.getCredential().getToken([".default"]);
    client.addHeader("Authorization", "Bearer " + accessToken?.token);
    const { data, meta } = await client.fetch(["locations", { page: { number: dgPage + 1, size: dgPageSize }, include: ["smartystreets", "geoframes", "googleplaces"]}])
    setRowCount(meta?.total)
    setRowData(data as any);
  }, { autoLoad: true })

  // MUTATE Request
  const MUTATE = useData( async () => {
    const accessToken = await teamsfx?.getCredential().getToken([".default"]);
    client.addHeader("Authorization", "Bearer " + accessToken?.token);
  });

  return (
    <>
      <Grid container direction="column" spacing={4} sx={{ px: 20, mt: 2 }}>
        {/* Header */}
        <Grid item container xs={12}>
          <Grid item>
            <Typography align="center" variant="h3">
              Locations
            </Typography>
          </Grid>
        </Grid>

        {/* DataGrid */}
        <Grid item>
          <DataGrid
            checkboxSelection
            columns={columnData}
            components={{ LoadingOverlay: LinearProgress }}
            initialState={{
              sorting: { sortModel: [{ field: "state", sort: "asc" }] },
            }}
            loading={READ.loading}
            onPageChange={(newDgPage) => setDgPage(newDgPage)}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            page={dgPage}
            pageSize={dgPageSize}
            rows={rowData}
            rowCount={rowCount}
            selectionModel={selectionModel}
            sx={{ height: 600, width: "100%" }}
          />
        </Grid>
      </Grid>
    </>
  );
}
