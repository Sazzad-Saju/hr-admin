export const getApiErrorMessage = (
  error,
  fallback = "Something went wrong. Please try again."
) => error.response?.data?.message || error.message || fallback;

export const getApiValidationErrors = (error) => {
  const errors = error.response?.data?.errors;

  if (!errors) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(errors).map(([field, messages]) => [
      field,
      Array.isArray(messages) ? messages[0] : messages,
    ])
  );
};
