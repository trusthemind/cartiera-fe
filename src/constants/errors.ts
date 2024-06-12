export const InputErrors = {
  field: {
    req: "This field is required",
    invalid: "This field is invalid",
    invalidText: (text: string) =>
      `${text[0].toUpperCase() + text.slice(1, text.length)} is invalid`,
    lenght: {
      min8: "Min length is 8 characters",
      min1: "Min length is 1 characters",
      min4: "Min length is 4 characters",
      max16: "Max length is 16 characters",
      max24: "Max length is 24 characters",
    },
    notMatch: "Fields dont match",
    positive: "This field must be a number",
  },
};
