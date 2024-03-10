import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "post";

/**
 * Creates a new post by making a POST request to the social media API.
 *
 * @function
 * @async
 * @param {Object} postData - The data for the new post.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The content of the post.
 * @param {string} postData.created - When the post was created.
 * @param {string} postData.id - The posts unique ID.
 * @returns {Promise<Object>} A Promise that resolves with the response data from the API.
 * @throws {Error} If the API request fails or if the response indicates an error.
 *
 * @example
 * const postData = {
 *   title: "New Post",
 *   body: "This is the content of the new post.",
 *   created: "2024-03-10T15:44:37.466Z",
 *   id: "1297"
 * };
 * try {
 *   const response = await createPost(postData);
 *   console.log("Post created successfully:", response);
 * } catch (error) {
 *   console.error("Error creating post:", error.message);
 * }
 */

export async function createPost(postData) {
  const createPostsURL = API_SOCIAL_URL + action;

  const response = await authFetch(createPostsURL, {
    method,
    body: JSON.stringify(postData),
  });

  const responseData = await response.json();

  if (response.ok) {
    window.location.reload();
  } else {
    console.error("Error creating post:", responseData.error);
  }

  return responseData;
}