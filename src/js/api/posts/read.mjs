import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import {
  showLoadingIndicator,
  hideLoadingIndicator,
} from "../../utils/loadingIndicator.mjs";

const action = "/posts";

/**
 * Retrieves a list of posts by making a GET request to the social media API.
 *
 * @param {string} url - The URL for the API endpoint.
 * @returns {Promise<Array<Object>>} A Promise that resolves with an array of post objects from the API.
 * @throws {Error} If the API request fails or if the response indicates an error.
 *
 * @example
 * try {
 *   const posts = await getPosts();
 *   console.log("Fetched posts successfully:", posts);
 * } catch (error) {
 *   console.error("Error fetching posts:", error.message);
 * }
 */

export async function getPosts() {
  try {
    showLoadingIndicator();

    const getPostsURL = `${API_SOCIAL_URL}${action}?_author=true`;

    const response = await authFetch(getPostsURL);

    if (!response.ok) {
      throw new Error("Error, unable to fetch posts");
    }
    hideLoadingIndicator();

    return await response.json();
  } catch (error) {
    hideLoadingIndicator();
    throw error;
  }
}

/**
 * Retrieves a specific post by making a GET request to the social media API.
 *
 * @param {string} id - The unique identifier of the post to be retrieved.
 * @returns {Promise<Object>} A Promise that resolves with the post object from the API.
 * @throws {Error} If the post ID is not provided, or if the API request fails or the response indicates an error.
 *
 * @example
 * const postId = "1297";
 * try {
 *   const post = await getPost(postId);
 *   console.log("Fetched post successfully:", post);
 * } catch (error) {
 *   console.error("Error fetching post:", error.message);
 * }
 */

export async function getPost(id) {
  try {
    showLoadingIndicator();

    if (!id) {
      throw new Error("Get requires a postID");
    }

    const getPostURL = `${API_SOCIAL_URL}${action}/${id}?_author=true`;

    const response = await authFetch(getPostURL);

    hideLoadingIndicator();

    return await response.json();
  } catch (error) {
    hideLoadingIndicator();
    throw error;
  }
}
