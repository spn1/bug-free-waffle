import { useState, useEffect, useMemo } from "react";
import { Movie } from "./types/movie";
import { Container, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MovieTable } from "./components/MovieTable";
import { MovieReviewForm } from "./components/MovieReviewForm";
import { useMovies } from "./hooks/useMovies";

const theme = createTheme({});

export const App = () => {
  const { movies, fetchMovies, loading, error } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <h1>Welcome to Movie database!</h1>
        <Button variant="contained" onClick={() => fetchMovies()}>
          Refresh
        </Button>
        <p>Total movies displayed: {movies.length}</p>
        <MovieTable
          loading={loading}
          error={error}
          movies={movies}
          setSelectedMovie={setSelectedMovie}
        />
        <MovieReviewForm selectedMovie={selectedMovie} />
      </Container>
    </ThemeProvider>
  );
};
