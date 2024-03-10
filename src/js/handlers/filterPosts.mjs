import { sortByImage } from "../api/posts/sortByImg.mjs";
import { showError } from "../utils/error.mjs";
import * as sorter from "../api/posts/index.mjs"
import { showPosts } from "../display.mjs";

const sortBy = document.querySelector("#sortOptions");
const postsContainer = document.querySelector("#post-container");

export async function handleFilterOption() {
    try {
        const selectedValue = sortBy.value;
        postsContainer.innerHTML = "";

        if (selectedValue === "withImage") {
            await sorter.sortByImage(postsContainer);
        }
        if (selectedValue === "oldestPosts") {
            await sorter.sortOldestPosts(postsContainer);
        }
        if (selectedValue === "newestPosts") {
            await showPosts(postsContainer);
        }

    } catch (error) {
        console.error()
        showError(error.message, "#post-container");
    }
}
 
if (sortBy) {
sortBy.addEventListener("change", handleFilterOption);
}