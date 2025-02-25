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

export async function formDataPost(data: any, endpoint: string) {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);
  formData.append("email", data.email);
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("occupation", data.occupation);
  formData.append("profileImageFile", data.profileImageFile);

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  return response;
}
