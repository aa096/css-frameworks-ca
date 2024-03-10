import { API_SOCIAL_URL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import {
  showLoadingIndicator,
  hideLoadingIndicator,
} from "../../utils/loadingIndicator.mjs";

const action = "/posts";

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
