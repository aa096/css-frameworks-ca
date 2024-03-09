import { getPosts } from "./read.mjs";
import { renderPostTemplates } from "../../templates/posts.mjs";
import { showError } from "../../utils/error.mjs";

const postsContainer = document.querySelector("#post-container");

export async function sortOldestPosts() {
    try {
      const posts = await getPosts();
  
      const sortedPosts = posts.sort((a, b) => {
        const dateA = new Date(a.created);
        const dateB = new Date(b.created);
        return dateA - dateB;
      });
  
      sortedPosts.forEach((post) => {
        renderPostTemplates(sortedPosts, postsContainer);
      });

    } catch (error) {
      console.error("Error sorting posts:", error);
      showError("Failed to sort posts. Please try again.", "error");
    }
  }