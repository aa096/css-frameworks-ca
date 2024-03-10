import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "put";

/**
 * Updates a post with the provided data by sending a PUT request to the social media API.
 *
 * @param {Object} postData - The data object containing information about the post to be updated.
 * @param {string} postData.id - The unique identifier of the post to be updated.
 * @param {string} postData.title - The updated title of the post.
 * @param {string} postData.body - The updated content of the post.
 * @param {string} postData.media - The updated media content of the post.
 *
 * @throws {Error} If the provided postData is missing the required 'id' property.
 * @throws {Error} If there is an issue updating the post or parsing the response.
 *
 * @returns {Object} The updated post data retrieved from the API.
 *
 * @example
 * try {
 *   const updatedPostData = await updatePost({
 *     id: "unique_post_id",
 *     title: "Updated Title",
 *     content: "Updated Content",
 *     author: "Updated Author",
 *     category: "Updated Category",
 *     tags: "tag1, tag2",
 *   });
 *   console.log("Post updated successfully:", updatedPostData);
 * } catch (error) {
 *   console.error("Error updating post:", error.message);
 * }
 */


export async function updatePost(postData) {
  if (!postData.id) {
    throw new Error("Update requires a postID");
  }

  const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;

  const response = await authFetch(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  });

  return await response.json();
}
