export const calculateAverageReviewScore = (reviews: number[] = []): number => {
  if (!reviews.length) return 0;

  const sum = reviews.reduce((sum, score) => sum + score, 0);
  const average = sum / reviews.length;

  return average;
};
