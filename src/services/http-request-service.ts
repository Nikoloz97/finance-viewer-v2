export class HttpRequestService {
  async get<T>(
    endpoint: string,
    errorMessage: string = `Failed to fetch data from ${endpoint}`
  ): Promise<T> {
    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error(`GET request failed:`, error);
      throw error; // Re-throw to allow handling in components
    }
  }

  async post<T>(
    data: unknown,
    endpoint: string,
    errorMessage: string = `Failed to post data to ${endpoint}`
  ): Promise<Response> {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error(`POST request failed:`, error);
      throw error;
    }
  }

  async formDataPost(
    formData: FormData,
    endpoint: string,
    errorMessage: string = `Failed to post form data to ${endpoint}`
  ): Promise<Response> {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(errorMessage);
      }

      return response;
    } catch (error) {
      console.error(`Form data POST request failed:`, error);
      throw error;
    }
  }

  async put<T>(
    data: unknown,
    endpoint: string,
    errorMessage: string = `Failed to update data at ${endpoint}`
  ): Promise<Response> {
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error(`PUT request failed:`, error);
      throw error;
    }
  }

  async deleteRequest<T>(
    endpoint: string,
    errorMessage: string = `Failed to delete resource at ${endpoint}`
  ): Promise<Response> {
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(errorMessage);
      }

      return response;
    } catch (error) {
      console.error(`DELETE request failed:`, error);
      throw error;
    }
  }
}
