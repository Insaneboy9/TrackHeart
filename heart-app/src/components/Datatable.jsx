import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function Datatable({ columns, rows }) {
  return (
    <div className="w-full h-5/6 bg-white">
      {rows && columns && (
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      )}
    </div>
  );
}

export default Datatable;
