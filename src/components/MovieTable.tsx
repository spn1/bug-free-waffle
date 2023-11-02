import { Movie } from "../types/movie";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { calculateAverageReviewScore } from "../utils/calculateAverageReviewScore";
import { Dispatch, SetStateAction } from "react";
import { Box, Skeleton } from "@mui/material";

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
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
  loading,
  error,
  setSelectedMovie,
}: {
  movies: Movie[];
  loading: boolean;
  error: string | undefined;
  setSelectedMovie: Dispatch<SetStateAction<Movie | undefined>>;
}) => {
  if (loading) return <Skeleton variant="rounded" width={200} height={500} />;
  if (error) return <Box>{error}</Box>;

  if (!movies.length) return null;

  return (
    <DataGrid
      rows={movies}
      columns={columns}
      onRowSelectionModelChange={(index) => {
        setSelectedMovie(movies[index[0] - 1]);
      }}
    />
  );
};
