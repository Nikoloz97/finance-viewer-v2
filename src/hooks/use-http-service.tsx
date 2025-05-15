import { HttpRequestService } from "../services/http-request-service";

// TODO: do we need this file anymore? This was originally passing demo data in
export function useHttpService() {
  return new HttpRequestService();
}
