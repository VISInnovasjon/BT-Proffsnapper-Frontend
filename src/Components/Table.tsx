import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

type gridProps = {
  ecoCode: string;
};
type TableData = {
  Name: string;
  OrgNumber: number;
  Branch: string;
  Value: number;
  Delta: number;
  Accumulated: number;
  ValidYear: number;
  EcoCode: string;
} & Record<string, string | number>;
const autosizeOptions = {
  includeHeaders: true,
  includeOutliers: true,
  expand: true,
};

export const DataGridComponent = ({ ecoCode }: gridProps) => {
  const [tableData, setTableData] = useState<TableData[] | null>(null);
  useEffect(() => {
    const FetchData = async () => {
      const searchParams = new URLSearchParams({ EcoCode: ecoCode });
      try {
        const url = "/api/tabledata?";

        const response = await fetch(url + searchParams.toString());
        if (response.status === 400) {
          console.log(response.statusText);
        }
        const result = await response.json();
        setTableData(result);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, [ecoCode]);

  /* useEffect(() => {
    const FetchData = async () => {
      const searchParams = new URLSearchParams({ EcoCode: ecoCode });
      try {
        const url = "/api/tabledata?";

        const response = await fetch(url + searchParams.toString());
        if (response.status === 400) {
          console.log(response.statusText);
        }
        const result = await response.json();
        setTableData(result);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, [ecoCode]);*/

  const columns = [
    { field: "Name", headerName: "Bedriftnavn", minWidth: 200 },
    { field: "OrgNumber", headerName: "Orgnummer", minWidth: 150 },
    { field: "Branch", headerName: "Bransje", minWidth: 150 },
    { field: "Value", headerName: "Verdi", minWidth: 150 },
    { field: "Delta", headerName: "Delta", minWidth: 150 },
    { field: "Accumulated", headerName: "Akkumulert", minWidth: 150 },
    { field: "ValidYear", headerName: "Gjeldende år", minWidth: 150 },
    { field: "EcoCode", headerName: "Øko kode", minWidth: 150 },
  ];

  return (
    <>
      {tableData != null ? (
        <div style={{ width: "100%" }}>
          <DataGrid
            rows={tableData.map((row, idx) => ({ ...row, id: idx }))}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            autosizeOptions={autosizeOptions}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10]}
          />
        </div>
      ) : null}
    </>
  );
};
