export async function get(endpoint: string, errorMessage: string) {
  try {
    const response = await fetch(`/api/investments`);

    if (!response.ok) {
      throw new Error("Failed to fetch investments");
    }

    return await response.json();
  } catch (error) {
    console.error();
  }
}

export async function post(data: unknown, endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error();
  }
}

export async function formDataPost(formData: FormData, endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    return response;
  } catch (error) {
    console.error();
  }
}
