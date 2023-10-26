import { Movie } from "../types/movie";
import { useState, useEffect } from "react";
import axios from "axios";

const fetchMovies = async (): Promise<Movie[]> => {
  const response = await axios.get("https://giddy-beret-cod.cyclic.app/movies");
  const { data } = response;
  console.log(response);
  return data;
};

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    const movies = fetchMovies();
    setMovies(movies);
  }, []);

  return [movies];
};
