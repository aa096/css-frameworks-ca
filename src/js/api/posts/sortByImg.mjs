import { getPosts } from "./read.mjs";
import { renderPostTemplates } from "../../templates/posts.mjs";
import { showError } from "../../utils/error.mjs";

const postsContainer = document.querySelector("#post-container");

/**
 * Sorts and renders posts that contain images by making use of the getPosts, renderPostTemplates,
 * and showError functions.
 *
 * @param {Object} postData - The data for a post.
 * @param {Array<Object>} postData.media - An array of media objects representing images.
 * @returns {boolean} Returns true if the post contains images, otherwise false.
 * @throws {Error} If there is an issue fetching posts or rendering templates.
 *
 * @example
 * try {
 *   await sortByImage();
 *   console.log("Posts sorted and rendered successfully.");
 * } catch (error) {
 *   console.error("Error sorting and rendering posts:", error.message);
 * }
 */

export async function sortByImage() {
    try {
        const posts = await getPosts();

        const sortedPosts = posts.filter ((postData) => 
        postData.media && postData.media.length > 0);

        renderPostTemplates(sortedPosts, postsContainer);
    
    } catch (error) {
        showError(error.message, "#post-container");
    }      
}