export async function post(data: unknown, endpoint: string) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function formDataPost(formData: FormData, endpoint: string) {
  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  return response;
}
