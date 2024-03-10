import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "delete";

/**
 * Removes a post by making a DELETE request to the social media API.
 *
 * @param {string} id - The unique identifier of the post to be deleted.
 * @returns {Promise<Object>} A Promise that resolves with the response data from the API.
 * @throws {Error} If the post ID is not provided or if the API request fails.
 *
 * @example
 * const postId = "1297";
 * try {
 *   const response = await removePost(postId);
 *   console.log("Post removed successfully:", response);
 * } catch (error) {
 *   console.error("Error removing post:", error.message);
 * }
 */

export async function removePost(id) {
  if (!id) {
    throw new Error("Deleting a post requires a postID");
  }

  const updatePostURL = `${API_SOCIAL_URL}${action}/${id}`;

  const response = await authFetch(updatePostURL, {
    method,
  });

  return await response.json();
}
