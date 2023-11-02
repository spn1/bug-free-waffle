import { Movie } from "../types/movie";
import { MovieCompany } from "../types/movieCompany";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const fetchData = <T>(
  url: string,
  setState: React.Dispatch<React.SetStateAction<T>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  axios
    .get(url)
    .then(({ data }) => {
      setState(data);
    })
    .catch((error) => {
      console.log(error?.message);
      setError(error?.message);
    });
};

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieCompanies, setMovieCompanies] = useState<MovieCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const fetchMovies = () => {
    setMovies([]);
    setMovieCompanies([]);
    fetchData("https://giddy-beret-cod.cyclic.app/movies", setMovies, setError);
    fetchData(
      "https://giddy-beret-cod.cyclic.app/movieCompanies",
      setMovieCompanies,
      setError
    );
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {}, 2000);
    fetchMovies();
    setLoading(false);
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

  return { movies: mergedMovies, fetchMovies, loading, error };
};
