export const calculatePercentage = (cur: number, total: number): number => {
  // avoid a NAN
  if (total === 0) return 0;

  // Calculate the percentage
  return (cur / total) * 100;
};
