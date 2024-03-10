import { load } from "../storage/index.mjs";

 /**
 * Generates headers for an HTTP request, including the Authorization token retrieved from storage.
 *
 * @returns {Object} An object containing headers with "Content-Type" set to "application/json"
 *                   and "Authorization" set to the Bearer token retrieved from storage.
 *
 * @example
 * const requestHeaders = headers();
 * console.log("Generated request headers:", requestHeaders);
 */


export function headers() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Performs an authenticated fetch by adding headers generated from the `headers` function to the request options.
 *
 * @param {string} url - The URL for the fetch request.
 * @param {Object} [options={}] - Additional options for the fetch request.
 *
 * @throws {Error} If there is an issue with the fetch request or if the Authorization token is missing.
 *
 * @returns {Promise<Response>} A Promise that resolves to the Response object representing the completion of the fetch request.
 *
 * @example
 * try {
 *   const response = await authFetch("https://api.noroff.dev//api/v1/social");
 *   const responseData = await response.json();
 *   console.log("Data fetched successfully:", responseData);
 * } catch (error) {
 *   console.error("Error fetching data:", error.message);
 * }
 */


export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
