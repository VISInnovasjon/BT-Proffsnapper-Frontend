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
  }, [ecoCode]);

  const { language } = useLanguage();

  const columns = [
    {
      field: "Name",
      headerName: translations[language].tablecol1,
      width: 250,
      flex: 2,
    },
    {
      field: "OrgNumber",
      headerName: translations[language].tablecol2,
      width: 150,
      flex: 1,
    },
    {
      field: "Branch",
      headerName: translations[language].tablecol3,
      width: 150,
      flex: 1,
    },
    {
      field: "Value",
      headerName: translations[language].tablecol4,
      width: 150,
      flex: 1,
    },
    {
      field: "Delta",
      headerName: translations[language].tablecol5,
      width: 150,
      flex: 1,
    },
    {
      field: "Accumulated",
      headerName: translations[language].tablecol6,
      width: 150,
      flex: 1,
    },
    {
      field: "ValidYear",
      headerName: translations[language].tablecol7,
      width: 150,
      flex: 1,
    },
    {
      field: "EcoCode",
      headerName: translations[language].tablecol8,
      width: 150,
      flex: 1,
    },
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
