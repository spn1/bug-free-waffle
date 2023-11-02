import { Movie } from "../types/movie";
import { MovieCompany } from "../types/movieCompany";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const fetchData = (url, setter) => {
  axios
    .get(url)
    .then(({ data }) => {
      setter(data);
    })
    .catch((error) => console.log(error?.message));
};

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieCompanies, setMovieCompanies] = useState<MovieCompany[]>([]);

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

  return mergedMovies;
};
