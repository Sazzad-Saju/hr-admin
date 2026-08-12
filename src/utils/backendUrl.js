import { API_ORIGIN } from "../config/env";

export const backendUrl = (path) => {
  if (!path) {
    return null;
  }

  try {
    return new URL(path, `${API_ORIGIN}/`).toString();
  } catch {
    return path;
  }
};
