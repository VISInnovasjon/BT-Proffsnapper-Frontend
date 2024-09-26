import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useLanguage } from "./LanguageContext";

type gridProps = {
  ecoCode: string;
  year: number;
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

export const DataGridComponent = ({ ecoCode, year }: gridProps) => {
  const [tableData, setTableData] = useState<TableData[] | null>(null);
  useEffect(() => {
    const FetchData = async () => {
      const searchParams = new URLSearchParams({
        EcoCode: ecoCode,
        Year: year.toString(),
      });
      try {
        const url = `${import.meta.env.VITE_API_TABLEDATA_URL}?`;

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
  }, [ecoCode, year]);

  const { languageSet } = useLanguage();

  const columns = [
    {
      field: "Name",
      headerName: languageSet.tablecol1,

      minWidth: 350,
    },
    {
      field: "OrgNumber",
      headerName: languageSet.tablecol2,

      minWidth: 200,
    },
    {
      field: "Branch",
      headerName: languageSet.tablecol3,

      minWidth: 200,
    },
    {
      field: "Value",
      headerName: languageSet.tablecol4,

      minWidth: 150,
    },
    {
      field: "Delta",
      headerName: languageSet.tablecol5,

      minWidth: 150,
    },
    {
      field: "Accumulated",
      headerName: languageSet.tablecol6,

      minWidth: 150,
    },
    {
      field: "ValidYear",
      headerName: languageSet.tablecol7,

      minWidth: 150,
    },
    {
      field: "EcoCode",
      headerName: languageSet.tablecol8,

      minWidth: 150,
    },
  ];

  return (
    <>
      {tableData != null ? (
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            autoHeight
            rows={tableData.map((row, idx) => ({ ...row, id: idx }))}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10, 25]}
          />
        </div>
      ) : null}
    </>
  );
};
