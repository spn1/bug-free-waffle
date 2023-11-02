import { useState, useEffect, useMemo } from "react";
import { Movie } from "./types/movie";
import { Container, Button } from "@mui/material";
import { MovieTable } from "./components/MovieTable";
import axios from "axios";
import { MovieReviewForm } from "./components/MovieReviewForm";
import { MovieCompany } from "./types/movieCompany";
import { useMovies } from "./hooks/useMovies";

export const App = () => {
  const movies = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  return (
    <Container maxWidth="md">
      <h1>Welcome to Movie database!</h1>
      <Button variant="contained">Refresh</Button>
      <p>Total movies displayed: {movies.length}</p>
      <MovieTable movies={movies} setSelectedMovie={setSelectedMovie} />
      <MovieReviewForm selectedMovie={selectedMovie} />
    </Container>
  );
};
