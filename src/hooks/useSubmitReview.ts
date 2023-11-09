import { useState, useCallback } from "react";
import axios from "axios";

export const useSubmitReview = () => {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const submitReview = useCallback((review: string): void => {
    setLoading(true);
    axios
      .post("https://giddy-beret-cod.cyclic.app/submitReview", {
        review,
      })
      .then((response) => {
        setResponse(response?.data?.message);
        setError(false);
      })
      .catch(() => {
        setResponse(
          "There was an error submitting your review, please try again later."
        );
        setError(true);
      });
    setLoading(false);
  }, []);

  const reset = useCallback(() => {
    setResponse("");
    setLoading(false);
    setError(false);
  }, []);

  return { submitReview, response, loading, error, reset };
};
