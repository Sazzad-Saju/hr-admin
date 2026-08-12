const apiBaseUrl = process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, "");

if (!apiBaseUrl) {
  throw new Error(
    "REACT_APP_API_BASE_URL is missing. Copy .env.example to .env and restart the React development server."
  );
}

let apiOrigin;

try {
  apiOrigin = new URL(apiBaseUrl).origin;
} catch {
  throw new Error("REACT_APP_API_BASE_URL must be a valid absolute URL.");
}

export const API_BASE_URL = apiBaseUrl;
export const API_ORIGIN = apiOrigin;
