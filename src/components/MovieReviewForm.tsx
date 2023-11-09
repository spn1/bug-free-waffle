import { useCallback, useState } from "react";
import { Movie } from "../types/movie";
import {
  Box,
  Input,
  Button,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { useSubmitReview } from "../hooks/useSubmitReview";

export const MovieReviewForm = ({
  selectedMovie,
}: {
  selectedMovie: Movie | undefined;
}) => {
  const [review, setReview] = useState<string>("");
  const [formError, setFormError] = useState<string>();
  const {
    submitReview,
    response,
    loading,
    error: submitError,
    reset,
  } = useSubmitReview();

  const onReviewChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormError(undefined);

      if (error) {
        reset();
      }

      const newReview = event.target.value;

      if (newReview.length > 100) {
        setFormError("Reviews have a maximum length of 100 characters");
        return;
      }

      setReview(newReview);
    },
    [review]
  );

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      submitReview(review);
    },
    [review]
  );

  const error = Boolean(submitError || formError);

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
        <Box component="form" onSubmit={onSubmit} sx={{ display: "block" }}>
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
            <FormHelperText id="review-error-text">
              {response || formError}
            </FormHelperText>
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
