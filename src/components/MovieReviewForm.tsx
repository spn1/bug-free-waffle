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

export const MovieReviewForm = ({
  selectedMovie,
}: {
  selectedMovie: Movie;
}) => {
  const [review, setReview] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const submitReview = useCallback(
    (e: React.FormEvent<HTMLInputElement>): void => {
      e.preventDefault();
      console.log("submit review for ", selectedMovie);
      console.log("review: ", review);
      try {
        setError(false);
      } catch (e) {
        setError(true);
      }
    },
    [review]
  );

  return (
    <Box sx={{ py: 2 }}>
      {selectedMovie
        ? selectedMovie.title
          ? "You have selected " + selectedMovie.title
          : "No Movie Title"
        : "No Movie Selected"}
      {selectedMovie && <p>Please leave a review below</p>}
      {selectedMovie && (
        <Box component="form" onSubmit={submitReview} sx={{ display: "block" }}>
          <FormControl error={error} variant="standard">
            <InputLabel htmlFor="review">Review:</InputLabel>
            <Input
              type="textarea"
              id="review"
              fullWidth
              aria-describedby="review-error-text"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setReview(event.target.value);
              }}
            />
            <FormHelperText id="review-error-text">
              There was an error submitting your review, please try again later
            </FormHelperText>
          </FormControl>
          <Button
            sx={{ my: 2, display: "block" }}
            type="submit"
            variant="contained"
            size="large"
          >
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};
