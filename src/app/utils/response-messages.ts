export const successResponse = (
  message = "Operation completed successfully.",
  status = 200
) => {
  return new Response(JSON.stringify({ message }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const failureResponse = (
  message = "Something went wrong.",
  status = 400
) => {
  return new Response(JSON.stringify({ message }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
