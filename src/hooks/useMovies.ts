import { Movie } from "../types/movie";
import { useState, useEffect } from "react";
import axios from "axios";

const fetchMovies = async (): Promise<Movie[]> => {
  const response = await axios.get("https://giddy-beret-cod.cyclic.app/movies");
  const { data } = response;

  console.log("Movies: ", data);

  return data;
};

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchMovies = async (): Promise<Movie[]> => {
      const response = await axios.get(
        "https://giddy-beret-cod.cyclic.app/movies"
      );
      const { data } = response;

      console.log("Movies: ", data);

      return data;
    };

    try {
      setLoading(true);
      const data = fetchMovies();
      setMovies(data);
      setLoading(false);
    } catch (error) {
      setError(error?.message);
      setLoading(false);
    }
  }, []);

  return { movies, loading, error };
};
