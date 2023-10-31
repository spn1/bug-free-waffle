import { useRef, useState, Children, useEffect } from "react";
import { easeIn, easeOut } from "polished";
import { useBoolean } from "react-use";
import { createReducer } from "@reduxjs/toolkit";
import { Movie } from "./types/movie";
import { Container, Button } from "@mui/material";
import { MovieTable } from "./components/MovieTable";
import axios from "axios";

// TODO: use https://giddy-beret-cod.cyclic.app/movieCompanies
const mockMovieCompanyData: any = [{ id: "1", name: "Test Productions" }];

export const App = () => {
  const [movies, setMovies] = useState([]);
  const movieLength = useRef(mockMovieData.length);
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

  return (
    <Container maxWidth="md">
      <h1>Welcome to Movie database!</h1>
      <Button variant="contained">Refresh</Button>
      <p>Total movies displayed {movieLength.current}</p>
      {movies?.length && <MovieTable movies={movies} />}
      {/* {mockMovieData.map((movie: any) => (
        <span
          onClick={() => {
            setSelectedMovie(movie);
          }}
        >
          {movie.title}{" "}
          {movie.reviews
            .reduce((acc: any, i: any) => (acc + i) / movie.reviews.length, 0)
            ?.toString()
            .substring(0, 3)}{" "}
          {
            mockMovieCompanyData.find((f: any) => f.id === movie.filmCompanyId)
              ?.name
          }
        </span>
      ))} */}
      {/* <div>
        {selectedMovie
          ? selectedMovie.title
            ? (("You have selected " + selectedMovie.title) as any)
            : "No Movie Title"
          : "No Movie Seelcted"}
        {selectedMovie && <p>Please leave a review below</p>}
        {selectedMovie && (
          <form onSubmit={() => {}}>
            <label>
              Review:
              <input type="text" />
            </label>
          </form>
        )}
      </div> */}
    </Container>
  );
};
