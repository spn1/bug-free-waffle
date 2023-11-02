import { Movie } from "../types/movie";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { calculateAverageReviewScore } from "../utils/calculateAverageReviewScore";
import { Dispatch, SetStateAction } from "react";

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 300 },
  {
    field: "averageReviewScore",
    headerName: "Average Review Score",
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${calculateAverageReviewScore(params.row.reviews)}`,
  },
  {
    field: "company",
    headerName: "Company",
    width: 300,
  },
];

export const MovieTable = ({
  movies,
  setSelectedMovie,
}: {
  movies: Movie[];
  setSelectedMovie: Dispatch<SetStateAction<Movie | undefined>>;
}) => {
  return (
    movies.length && (
      <DataGrid
        rows={movies}
        columns={columns}
        onRowSelectionModelChange={(index) => {
          setSelectedMovie(movies[index[0] - 1]);
        }}
      />
    )
  );
};
