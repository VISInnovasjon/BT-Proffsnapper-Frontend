import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useLanguage } from "./LanguageContext";
import translations from "./translations";

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

export const DataGridComponent = ({ ecoCode }: gridProps) => {
  const [tableData, setTableData] = useState<TableData[] | null>(null);
  useEffect(() => {
    const FetchData = async () => {
      const searchParams = new URLSearchParams({ EcoCode: ecoCode });
      try {
        const url = ""; //Denne må endres på når siden går live.

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

  useEffect(() => {
    const FetchData = async () => {
      const searchParams = new URLSearchParams({ EcoCode: ecoCode });
      try {
        const url = "http://192.168.9.78:5000" + "/api/tabledata?";

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

  const columns = [
    { field: "Name", headerName: "Bedriftnavn", width: 250, flex: 2 },
    { field: "OrgNumber", headerName: "Orgnummer", width: 150, flex: 1 },
    { field: "Branch", headerName: "Bransje", width: 150, flex: 1 },
    { field: "Value", headerName: "Verdi", width: 150, flex: 1 },
    { field: "Delta", headerName: "Delta", width: 150, flex: 1 },
    { field: "Accumulated", headerName: "Akkumulert", width: 150, flex: 1 },
    { field: "ValidYear", headerName: "Gjeldende år", width: 150, flex: 1 },
    { field: "EcoCode", headerName: "Øko kode", width: 150, flex: 1 },
  ];

  return (
    <>
      {tableData != null ? (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={tableData.map((row, idx) => ({ ...row, id: idx }))}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10]}
          />
        </div>
      ) : null}
    </>
  );
};
