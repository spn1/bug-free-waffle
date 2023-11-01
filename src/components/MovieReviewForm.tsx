import { useCallback, useState } from "react";
import { Movie } from "../types/movie";
import {
  Box,
  TextField,
  Input,
  Button,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import axios from "axios";

export const MovieReviewForm = ({
  selectedMovie,
}: {
  selectedMovie: Movie | undefined;
}) => {
  const [review, setReview] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onReviewChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (error) {
        setError(false);
        setMessage("");
      }

      const review = event.target.value;

      if (review.length >= 100) {
        setMessage("Reviews have a maximum length of 100 characters");
        setError(true);
        return;
      }

      setReview(review);
    },
    [error]
  );

  const submitReview = useCallback(
    (event: React.FormEvent<HTMLInputElement>): void => {
      event.preventDefault();

      setLoading(true);
      axios
        .post("https://giddy-beret-cod.cyclic.app/submitReview", {
          review,
        })
        .then((response) => {
          setMessage(response?.data?.message);
          setError(false);
        })
        .catch(() => {
          setMessage(
            "There was an error submitting your review, please try again later."
          );
          setError(true);
        });
      setLoading(false);
    },
    [review]
  );

  return (
    <Box sx={{ py: 2 }}>
      <p>
        {selectedMovie
          ? selectedMovie.title
            ? "You have selected " + selectedMovie.title
            : "No Movie Title"
          : "No Movie Selected"}
      </p>
      {selectedMovie && <p>Please leave a review below</p>}
      {selectedMovie && (
        <Box component="form" onSubmit={submitReview} sx={{ display: "block" }}>
          <FormControl
            disabled={loading}
            error={error}
            variant="standard"
            sx={{ display: "block" }}
          >
            <InputLabel htmlFor="review">Review:</InputLabel>
            <Input
              type="textarea"
              id="review"
              value={review}
              fullWidth
              aria-describedby="review-error-text"
              onChange={onReviewChange}
            />
            <FormHelperText id="review-error-text">{message}</FormHelperText>
          </FormControl>
          <Button
            sx={{ my: 2, display: "block" }}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};
