import { getPosts } from "./read.mjs";
import { renderPostTemplates } from "../../templates/posts.mjs";
import { showError } from "../../utils/error.mjs";

const postsContainer = document.querySelector("#post-container");

/**
 * Sorts and renders posts in ascending order based on their creation date.
 *
 * @param {Function} getPosts - A function that fetches the posts to be sorted.
 * @param {Function} renderPostTemplates - A function that renders post templates to the DOM
 * @throws {Error} If there is an issue fetching posts or rendering templates.
 *
 * @example
 * try {
 *   await sortOldestPosts();
 *   console.log("Posts sorted and rendered successfully.");
 * } catch (error) {
 *   console.error("Error sorting and rendering posts:", error.message);
 * }
 */

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