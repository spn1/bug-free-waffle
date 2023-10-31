import { Movie } from "../types/movie";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { calculateAverageReviewScore } from "../utils/calculateAverageReviewScore";

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 130 },
  {
    field: "averageReviewScore",
    headerName: "Average Review Score",
    valueGetter: (params: GridValueGetterParams) =>
      `${calculateAverageReviewScore(params.row.reviews)}`,
  },
  {
    field: "filmCompanyId",
    headerName: "Company",
  },
];

export const MovieTable = ({ movies }: { movies: Movie[] }) => {
  return <DataGrid rows={movies} columns={columns} />;
};
