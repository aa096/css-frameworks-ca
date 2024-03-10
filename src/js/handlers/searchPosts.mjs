import { getPosts } from "../api/posts/read.mjs";
import { renderPostTemplates } from "../templates/posts.mjs";
import { showError } from "../utils/error.mjs";

const searchInput = document.querySelector("#searchPosts");
const searchBtn = document.querySelector("#searchBtn");

if (searchInput && searchBtn) {
  searchBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const searchQuery = searchInput.value.trim().toLowerCase();

    try {
      const posts = await getPosts();

      const searchedPosts = posts.filter(
        (postData) =>
          postData.body.toLowerCase().includes(searchQuery) ||
          postData.title.toLowerCase().includes(searchQuery) ||
          postData.author.name.toLowerCase().includes(searchQuery)
      );

      renderSearchedPosts(searchedPosts);
    } catch (error) {
      console.error(error);
      showError(error.message, "#post-container");
    }
  });

  function renderSearchedPosts(posts) {
    const postContainer = document.querySelector("#post-container");
    postContainer.innerHTML = "";

    renderPostTemplates(posts);
  }
}
