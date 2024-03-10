import { postTemplate } from "../templates/post.mjs";
import { getTitle } from "../templates/getTitle.mjs";
import { getPost } from "../api/posts/read.mjs";
import { showError } from "../utils/error.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function displayPost() {
  try {
    const result = await getPost(id);
    getTitle(result);
    postTemplate(result);
  } catch (error) {
    showError(error.message, "#postContainer");
  }
}

displayPost();
