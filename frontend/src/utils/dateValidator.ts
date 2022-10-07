export const validateDate = (input) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const date = new Date(input.value);

  return date > currentDate
    ? null
    : {
        validateDate: {
          valid: false,
        },
      };
};
