import { Tooltip } from "@mui/material";
import {
  GridColumns,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";

export default function columns(data: any) {
  const dynamicColumns: GridColumns = Object.entries(data[0])
    .filter((pair: any) => {
      if (typeof pair[1] === "number" || typeof pair[1] === "string") {
        return pair;
      }
    })
    .map((arr: any) => {
      return {
        field: arr[0],
        headerName: arr[0],
        editable: true,
        flex: 1,
        type: "string",
      };
    });

  const staticColumns: GridColumns = [
    {
      field: "actions",
      type: "actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={
            <Tooltip title="Delete">
              <DeleteIcon />
            </Tooltip>
          }
          onClick={() => console.log(row)}
          label="Delete"
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Address Info">
              <ListAltRoundedIcon />
            </Tooltip>
          }
          onClick={() => console.log(row)}
          label="Address Info"
        />,
      ],
    },
    { ...GRID_CHECKBOX_SELECTION_COL_DEF, width: 80 },
  ];

  return dynamicColumns.concat(staticColumns);
}
