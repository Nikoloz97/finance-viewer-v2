import { toast } from "react-toastify";

export async function responseMessage(response: Response) {
  const responseJson = await response.json();
  if (response.ok) {
    if (responseJson.message) {
      toast.success(responseJson.message);
    } else {
      toast.success("Success!");
    }
  } else {
    if (responseJson.message) {
      toast.warning(responseJson.message);
    } else {
      toast.warning("Something went wrong...");
    }
  }

  return responseJson;
}
