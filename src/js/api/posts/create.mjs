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

  const responseData = await response.json();

  // Check if the post was created successfully
  if (response.ok) {
    // If successful, refresh the window
    window.location.reload();
  } else {
    // Handle the error or provide feedback to the user
    console.error("Error creating post:", responseData.error);
  }

  return responseData;
}