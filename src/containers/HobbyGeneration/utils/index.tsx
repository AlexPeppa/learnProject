export const generateDefaultPoints = () => {
  const marks: { value: number; label: string }[] = [];
  for (let value = 0; value <= 100; value = value + 10) {
    const label = (value / 100).toString();
    marks.push({ value, label });
  }
  return marks;
};
