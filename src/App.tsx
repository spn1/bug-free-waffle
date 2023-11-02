import { useState, useEffect, useMemo } from "react";
import { Movie } from "./types/movie";
import { Container, Button } from "@mui/material";
import { MovieTable } from "./components/MovieTable";
import axios from "axios";
import { MovieReviewForm } from "./components/MovieReviewForm";
import { MovieCompany } from "./types/movieCompany";

// TODO: use https://giddy-beret-cod.cyclic.app/movieCompanies
const mockMovieCompanyData: any = [{ id: "1", name: "Test Productions" }];

const fetchData = async (url, setter) => {
  axios
    .get(url)
    .then(({ data }) => {
      setter(data);
    })
    .catch((error) => console.log(error?.message));
};

// const mungeMovies = (movies, movieCompanies) => {
//   return movies.reduce((acc, movie) => {
//     const company = movieCompanies.find(
//       (company) => movie.filmCompanyId === company.id
//     );
//     acc.push({
//       ...movie,
//       company: company?.name,
//     });
//   }, []);
// };

export const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieCompanies, setMovieCompanies] = useState<MovieCompany[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  useEffect(() => {
    fetchData("https://giddy-beret-cod.cyclic.app/movies", setMovies);
    fetchData(
      "https://giddy-beret-cod.cyclic.app/movieCompanies",
      setMovieCompanies
    );
  }, []);

  const mergedMovies = useMemo(() => {
    return movies.reduce((acc: Movie[], movie: Movie) => {
      const company = movieCompanies.find(
        (company) => movie.filmCompanyId === company.id
      );
      acc.push({
        ...movie,
        company: company?.name,
      });
      return acc;
    }, []);
  }, [movies, movieCompanies]);

  return (
    <Container maxWidth="md">
      <h1>Welcome to Movie database!</h1>
      <Button variant="contained">Refresh</Button>
      <p>Total movies displayed: {movies.length}</p>
      <MovieTable movies={mergedMovies} setSelectedMovie={setSelectedMovie} />
      <MovieReviewForm selectedMovie={selectedMovie} />
    </Container>
  );
};
