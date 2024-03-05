import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "post";

export async function createPost(postData) {
  const createPostsURL = API_SOCIAL_URL + action;

  const response = await authFetch(createPostsURL, {
    method,
    body: JSON.stringify(postData),
  });

  return await response.json();;
}
