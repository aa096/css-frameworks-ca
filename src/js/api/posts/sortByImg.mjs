import { getPosts } from "./read.mjs";
import { renderPostTemplates } from "../../templates/posts.mjs";
import { showError } from "../../utils/error.mjs";

const postsContainer = document.querySelector("#post-container");

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