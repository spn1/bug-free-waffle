import { useRef, useState, Children, useEffect } from "react";
import { easeIn, easeOut } from "polished";
import { useBoolean } from "react-use";
import { createReducer } from "@reduxjs/toolkit";
import { Movie } from "./types/movie";
import { Box, Container, Button } from "@mui/material";
import { MovieTable } from "./components/MovieTable";
import axios from "axios";
import { MovieReviewForm } from "./components/MovieReviewForm";

// TODO: use https://giddy-beret-cod.cyclic.app/movieCompanies
const mockMovieCompanyData: any = [{ id: "1", name: "Test Productions" }];

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  useEffect(() => {
    const fetchMovies = async () => {
      axios
        .get("https://giddy-beret-cod.cyclic.app/movies")
        .then(({ data }) => {
          setMovies(data);
        });
    };

    fetchMovies();
  }, []);

  console.log(selectedMovie);

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
